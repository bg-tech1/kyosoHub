package repository

import (
	"kyosohub/domain"
	"log"

	"gorm.io/gorm"
)

type UserProfileRepository interface {
	Create(profile *domain.UserProfile) error
	FindById(id string) (*domain.UserProfile, error)
	FindByUserId(userId string) (*domain.UserProfile, error)
	Update(profile *domain.UserProfile) error
	Delete(id string) error
}

type userProfileRepository struct {
	db *gorm.DB
}

func NewUserProfileRepository(db *gorm.DB) UserProfileRepository {
	return &userProfileRepository{db: db}
}

func (r *userProfileRepository) Create(profile *domain.UserProfile) error {
	if err := r.db.Create(profile).Error; err != nil {
		log.Println("ERROR: Failed to create user profile", err)
		return err
	}
	log.Println("INFO: Successfully created user profile")
	return nil
}

func (r *userProfileRepository) FindById(id string) (*domain.UserProfile, error) {
	var profile domain.UserProfile
	if err := r.db.First(&profile, id).Error; err != nil {
		log.Println("ERROR: Failed to find user profile by Id", err)
		return nil, err
	}
	log.Println("INFO: Successfully found user profile by Id", id)
	return &profile, nil
}

func (r *userProfileRepository) FindByUserId(userId string) (*domain.UserProfile, error) {
	var profile domain.UserProfile
	if err := r.db.Where("user_id = ?", userId).First(&profile).Error; err != nil {
		log.Println("ERROR: Failed to find user profile by UserId", err)
		return nil, err
	}
	log.Println("INFO: Successfully found user profile by UserId")
	return &profile, nil
}

func (r *userProfileRepository) Update(profile *domain.UserProfile) error {
	if err := r.db.Model(&domain.UserProfile{}).
		Where("user_id = ?", profile.UserId).
		Updates(domain.UserProfile{
			Username:  profile.Username,
			Birthdate: profile.Birthdate,
			Gender:    profile.Gender,
			Bio:       profile.Bio,
		}).Error; err != nil {
		log.Println("ERROR: Failed to update user profile", err)
	}
	log.Println("INFO: Successfully updated user profile")
	return nil
}

func (r *userProfileRepository) Delete(id string) error {
	if err := r.db.Delete(&domain.UserProfile{}, id).Error; err != nil {
		log.Println("ERROR: Failed to delete user profile by Id", err)
		return err
	}
	log.Println("INFO: Successfully deleted user profile by Id")
	return nil
}
