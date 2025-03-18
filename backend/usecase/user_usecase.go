package usecase

import (
	"fmt"
	"kyosohub/domain"
	"kyosohub/pkg/util"
	"kyosohub/repository"
	"log"
)

type UserUsecase interface {
	GetUserInfo(id string) (*domain.User, error)
	LoginUser(email, passeord string) (*domain.User, error)
	RegisterUser(user *domain.User) error
	RegisterUserProfile(profile *domain.UserProfile) error
	GetUserProfile(id string) (*domain.UserProfile, error)
	UpdateUserProfile(profile *domain.UserProfile) error
	DeleteUserProfile(id string) error
}

type userUsecase struct {
	repo        repository.UserRepository
	profileRepo repository.UserProfileRepository
}

func NewUserUsecase(repo repository.UserRepository, profileRepo repository.UserProfileRepository) UserUsecase {
	return &userUsecase{repo: repo, profileRepo: profileRepo}
}

func (u *userUsecase) LoginUser(email, passeord string) (*domain.User, error) {
	user, err := u.repo.FindByEmail(email)
	if err != nil {
		log.Println("ERROR: Faild to login")
		return nil, err
	}
	userExits := util.ComparePassword(user.Password, passeord)
	if !userExits {
		return nil, fmt.Errorf("invalid password")
	}
	log.Println("INFO: User login successful")
	return user, nil
}

func (u *userUsecase) RegisterUser(user *domain.User) error {
	hashedPassword, err := util.HashPassword(user.Password)
	if err != nil {
		log.Println("ERROR: Faild to hash passeord")
		return err
	}
	user.Password = hashedPassword
	user.Id = util.GenerateUUID()
	err = u.repo.Save(user)
	if err != nil {
		log.Println("ERROR: Faild to register user")
		return err
	}
	err = u.profileRepo.Create(&domain.UserProfile{
		Id:       util.GenerateUUID(),
		UserId:   user.Id,
		Username: user.UserName,
		Bio:      "はじめまして、よろしくお願いします。",
	})
	if err != nil {
		log.Println("ERROR: Faild to register user profile")
		return err
	}
	return nil
}

func (u *userUsecase) GetUserInfo(id string) (*domain.User, error) {
	user, err := u.repo.FindById(id)
	if err != nil {
		log.Println("ERROR: Faild to get userinfo")
		return nil, err
	}
	return user, nil
}

func (u *userUsecase) GetUserProfile(id string) (*domain.UserProfile, error) {
	profile, err := u.profileRepo.FindByUserId(id)
	if err != nil {
		log.Println("ERROR: Failed to get user profile")
		return nil, err
	}
	return profile, nil
}

func (u *userUsecase) RegisterUserProfile(profile *domain.UserProfile) error {
	err := u.profileRepo.Create(profile)
	if err != nil {
		log.Println("ERROR: Failed to register user profile")
		return err
	}
	log.Println("INFO: User profile registered successfully")
	return nil
}

func (u *userUsecase) UpdateUserProfile(profile *domain.UserProfile) error {
	err := u.profileRepo.Update(profile)
	if err != nil {
		log.Println("ERROR: Failed to update user profile")
		return err
	}
	log.Println("INFO: User profile updated successfully")
	return nil
}

func (u *userUsecase) DeleteUserProfile(id string) error {
	err := u.profileRepo.Delete(id)
	if err != nil {
		log.Println("ERROR: Failed to delete user profile")
		return err
	}
	log.Println("INFO: User profile deleted successfully")
	return nil
}
