package domain

type UserProfile struct {
	Id        string `gorm:"primaryKey" json:"id"`
	UserId    string `gorm:"not null;uniqueIndex" json:"user_id"`
	Username  string `gorm:"not null" json:"username"`
	Gender    string `gorm:"type:varchar(10)" json:"gender"`
	Bio       string `gorm:"type:text" json:"bio"`
	Birthdate string `gorm:"type:varchar(10)" json:"birthdate"`
	// `User` との 1対1 関係
	User *User `gorm:"foreignKey:UserId" json:"user,omitempty"`
}
