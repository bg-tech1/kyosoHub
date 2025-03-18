package domain

import (
	"time"
)

type CollaborationParticipant struct {
	Id        string    `gorm:"primaryKey" json:"id"`
	PostId    string    `gorm:"not null;index;uniqueIndex:idx_post_user" json:"post_id"`
	UserId    string    `gorm:"not null;index;uniqueIndex:idx_post_user" json:"user_id"`
	Status    string    `gorm:"type:varchar(20);default:'pending'" json:"status"` // 承認状態（pending, approved, rejected）
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`

	// 外部キーの設定
	CollaborationPost *CollaborationPost `gorm:"foreignKey:PostId;constraint:OnDelete:CASCADE" json:"collaborationPost,omitempty"`
	User              *User              `gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE" json:"user,omitempty"`
}
