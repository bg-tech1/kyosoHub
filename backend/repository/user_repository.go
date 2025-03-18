package repository

import (
	"kyosohub/domain"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindById(id string) (*domain.User, error)
	FindByEmail(email string) (*domain.User, error)
	Save(user *domain.User) error
}

type userRepository struct {
	db *gorm.DB
}

// DI
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) FindById(id string) (*domain.User, error) {
	var user domain.User
	result := r.db.Where("id = ?", id).Preload("UserProfile").First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (r *userRepository) FindByEmail(email string) (*domain.User, error) {
	var user domain.User
	result := r.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (r *userRepository) Save(user *domain.User) error {
	return r.db.Create(user).Error
}
