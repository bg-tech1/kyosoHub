package domain

import "errors"

type UserProfile struct {
	Id        string `gorm:"primaryKey" json:"id"`
	UserId    string `gorm:"not null;uniqueIndex" json:"user_id"`
	Username  string `gorm:"not null" json:"username"`
	AvatarUrl string `gorm:"type:text" json:"avatar_url"`
	Gender    string `gorm:"type:varchar(10)" json:"gender"`
	Bio       string `gorm:"type:text" json:"bio"`
	Birthdate string `gorm:"type:varchar(10)" json:"birthdate"`

	User *User `gorm:"foreignKey:UserId" json:"user,omitempty"`
}

func (up *UserProfile) Validate() error {
	if up.Username == "" {
		return errors.New("username is required")
	}

	if up.Gender != "" && up.Gender != "male" && up.Gender != "female" && up.Gender != "other" {
		return errors.New("gender must be 'male', 'female', or 'other'")
	}

	if len(up.Bio) > 1000 {
		return errors.New("bio must be less than 1000 characters")
	}

	return nil
}
