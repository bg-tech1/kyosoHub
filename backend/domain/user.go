package domain

import "time"

type User struct {
	Id        string    `gorm:"primaryKey" json:"id"`
	UserName  string    `gorm:"not null" json:"username"`
	Email     string    `gorm:"unique" json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	UserProfile *UserProfile `gorm:"foreignKey:UserId" json:"userProfile,omitempty"`
}
