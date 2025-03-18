package domain

import (
	"time"
)

type CollaborationPost struct {
	Id          string    `gorm:"primaryKey" json:"id"`
	UserId      string    `gorm:"not null" json:"user_id"`
	Title       string    `gorm:"type:varchar(255);not null" json:"title"`
	Description string    `gorm:"type:text;not null" json:"description"`
	Category    string    `gorm:"type:varchar(50)" json:"category"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// 外部キーの設定
	User                     *User                       `gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE" json:"user,omitempty"`
	CollaborationParticipant *[]CollaborationParticipant `gorm:"foreignKey:PostId" json:"collaborationParticipant,omitempty"`
}
