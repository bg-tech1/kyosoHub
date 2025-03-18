package repository

import (
	"kyosohub/domain"
	"log"

	"gorm.io/gorm"
)

type CollaborationPostRepository interface {
	Create(post *domain.CollaborationPost) error
	FindById(id string) (*domain.CollaborationPost, error)
	FindAllByUserId(userId string) ([]domain.CollaborationPost, error)
	FindAll() ([]domain.CollaborationPost, error)
	Update(post *domain.CollaborationPost) error
	Delete(id string) error
}

type collaborationPostRepository struct {
	db *gorm.DB
}

func NewCollaborationPostRepository(db *gorm.DB) CollaborationPostRepository {
	return &collaborationPostRepository{db: db}
}

func (r *collaborationPostRepository) Create(post *domain.CollaborationPost) error {
	if err := r.db.Create(post).Error; err != nil {
		log.Println("ERROR: Failed to create collaboration post", err)
		return err
	}
	log.Println("INFO: Successfully created collaboration post")
	return nil
}

func (r *collaborationPostRepository) FindById(id string) (*domain.CollaborationPost, error) {
	var post domain.CollaborationPost
	if err := r.db.Where("id = ?", id).
		Preload("User").
		Preload("User.UserProfile").
		Find(&post).Error; err != nil {
		log.Println("ERROR: Failed to find collaboration post by Id", err)
		return nil, err
	}
	log.Println("INFO: Successfully found collaboration post by Id", id)
	return &post, nil
}

func (r *collaborationPostRepository) FindAllByUserId(userId string) ([]domain.CollaborationPost, error) {
	var post []domain.CollaborationPost
	if err := r.db.Where("user_id = ?", userId).
		Preload("User").
		Preload("User.UserProfile").
		Find(&post).Error; err != nil {
		log.Println("ERROR: Failed to find collaboration post by UserId", err)
		return nil, err
	}
	log.Println("INFO: Successfully found collaboration post by UserId")
	return post, nil
}

func (r *collaborationPostRepository) FindAll() ([]domain.CollaborationPost, error) {
	var posts []domain.CollaborationPost
	if err := r.db.Debug().
		Preload("User").
		Preload("User.UserProfile").
		Find(&posts).Error; err != nil {
		log.Println("ERROR: Failed to find all collaboration posts", err)
		return nil, err
	}
	log.Println("INFO: Successfully found all collaboration posts")
	return posts, nil
}

func (r *collaborationPostRepository) Update(post *domain.CollaborationPost) error {
	if err := r.db.Save(post).Error; err != nil {
		log.Println("ERROR: Failed to update collaboration post", err)
		return err
	}
	log.Println("INFO: Successfully updated collaboration post")
	return nil
}

func (r *collaborationPostRepository) Delete(id string) error {
	if err := r.db.Where("id = ?", id).Delete(&domain.CollaborationPost{}).Error; err != nil {
		log.Println("ERROR: Failed to delete collaboration post by Id", err)
		return err
	}
	log.Println("INFO: Successfully deleted collaboration post by Id")
	return nil
}
