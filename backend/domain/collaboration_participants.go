package domain

import (
	"errors"
	"time"
)

type CollaborationParticipant struct {
	Id        string    `gorm:"primaryKey" json:"id"`
	PostId    string    `gorm:"not null;index;uniqueIndex:idx_post_user" json:"post_id"`
	UserId    string    `gorm:"not null;index;uniqueIndex:idx_post_user" json:"user_id"`
	Status    string    `gorm:"type:varchar(20);default:'pending'" json:"status"` // 承認状態（pending, approved, rejected）
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	CollaborationPost *CollaborationPost `gorm:"foreignKey:PostId;constraint:OnDelete:CASCADE" json:"collaborationPost,omitempty"`
	User              *User              `gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE" json:"user,omitempty"`
}

func (cp *CollaborationParticipant) Validate() error {
	if cp.UserId == "" {
		return errors.New("user_id is required")
	}

	if cp.PostId == "" {
		return errors.New("post_id is required")
	}

	validStatuses := map[string]bool{
		"pending":  true,
		"approved": true,
		"rejected": true,
	}

	if !validStatuses[cp.Status] {
		return errors.New("status must be 'pending', 'approved', or 'rejected'")
	}

	return nil
}
