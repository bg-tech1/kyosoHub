package domain

import (
	"errors"
	"regexp"
	"time"
)

type User struct {
	Id        string    `gorm:"primaryKey" json:"id"`
	UserName  string    `gorm:"not null" json:"username"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	UserProfile *UserProfile `gorm:"foreignKey:UserId" json:"userProfile,omitempty"`
}

func (u *User) Validate(isLogin bool) error {
	if isLogin {
		if u.Email == "" || u.Password == "" {
			return errors.New("username, email and password are required fields")
		}
	} else {
		if u.UserName == "" || u.Email == "" || u.Password == "" {
			return errors.New("username, email and password are required fields")
		}
		if len(u.UserName) < 3 {
			return errors.New("username must be at least 3 characters")
		}
	}
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	if !emailRegex.MatchString(u.Email) {
		return errors.New("invalid email format")
	}

	if len(u.Password) < 4 {
		return errors.New("password must be at least 8 characters")
	}
	return nil
}
