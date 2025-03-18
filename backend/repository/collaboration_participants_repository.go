package repository

import (
	"kyosohub/domain"
	"log"

	"gorm.io/gorm"
)

type CollaborationParticipantRepository interface {
	Create(participant *domain.CollaborationParticipant) error
	FindById(userId, postId string) (*domain.CollaborationParticipant, error)
	FindByUserId(userId string, status string) ([]domain.CollaborationParticipant, error)
	FindByPostId(postId string, status string) ([]domain.CollaborationParticipant, error)
	FindAll() ([]domain.CollaborationParticipant, error)
	Update(participant *domain.CollaborationParticipant) error
	UpdateStatus(userId, postId, status string) error
	Delete(userId, postId string) error
}

type collaborationParticipantRepository struct {
	db *gorm.DB
}

func NewCollaborationParticipantRepository(db *gorm.DB) CollaborationParticipantRepository {
	return &collaborationParticipantRepository{db: db}
}

func (r *collaborationParticipantRepository) Create(participant *domain.CollaborationParticipant) error {
	if err := r.db.Create(participant).Error; err != nil {
		log.Println("ERROR: Failed to create collaboration participant", err)
		return err
	}
	log.Println("INFO: Successfully created collaboration participant")
	return nil
}

func (r *collaborationParticipantRepository) FindById(userId, postId string) (*domain.CollaborationParticipant, error) {
	var participant domain.CollaborationParticipant
	if err := r.db.Where("user_id = ? AND post_id = ?", userId, postId).
		Preload("User").
		Preload("CollaborationPost").
		First(&participant).Error; err != nil {
		log.Println("ERROR: Failed to find collaboration participant by UserId & PostId", err)
		return nil, err
	}
	log.Println("INFO: Successfully found collaboration participant by UserId & PostId")
	return &participant, nil
}

func (r *collaborationParticipantRepository) FindByUserId(userId string, status string) ([]domain.CollaborationParticipant, error) {
	var participants []domain.CollaborationParticipant
	if status == "any" {
		if err := r.db.Where("user_id = ?", userId).
			Preload("User").
			Preload("User.UserProfile").
			Preload("CollaborationPost").
			Find(&participants).Error; err != nil {
			log.Println("ERROR: Failed to find all collaboration participants for user", err)
			return nil, err
		}
	} else if status == "pending" || status == "approved" || status == "rejected" {
		if err := r.db.Where("user_id = ? AND status = ?", userId, status).
			Preload("User").
			Preload("CollaborationPost").
			Find(&participants).Error; err != nil {
			log.Println("ERROR: Failed to find all collaboration participants for user", err)
			return nil, err
		}
	}
	log.Println("INFO: Successfully found all collaboration participants for user")
	return participants, nil
}

func (r *collaborationParticipantRepository) FindByPostId(postId string, status string) ([]domain.CollaborationParticipant, error) {
	var participants []domain.CollaborationParticipant
	if status == "any" {
		if err := r.db.Where("post_id = ?", postId).
			Preload("User").
			Preload("CollaborationPost").
			Find(&participants).Error; err != nil {
			log.Println("ERROR: Failed to find collaboration participants by postId and status:", err)
			return nil, err
		}
	} else if status == "pending" || status == "approved" || status == "rejected" {
		if err := r.db.Where("post_id = ? AND status = ?", postId, status).
			Preload("User").
			Preload("User.UserProfile").
			Preload("CollaborationPost").
			Find(&participants).Error; err != nil {
			log.Println("ERROR: Failed to find collaboration participants by postId and status:", err)
			return nil, err
		}
	}
	log.Println("INFO: Successfully found collaboration participants by postId and status")
	return participants, nil
}

func (r *collaborationParticipantRepository) FindAll() ([]domain.CollaborationParticipant, error) {
	var participants []domain.CollaborationParticipant
	if err := r.db.
		Preload("User").
		Preload("CollaborationPost").
		Find(&participants).Error; err != nil {
		log.Println("ERROR: Failed to find all collaboration participants", err)
		return nil, err
	}
	log.Println("INFO: Successfully found all collaboration participants")
	return participants, nil
}

func (r *collaborationParticipantRepository) Update(participant *domain.CollaborationParticipant) error {
	if err := r.db.Save(participant).Error; err != nil {
		log.Println("ERROR: Failed to update collaboration participant", err)
		return err
	}
	log.Println("INFO: Successfully updated collaboration participant")
	return nil
}

func (r *collaborationParticipantRepository) UpdateStatus(userId, postId, status string) error {
	if err := r.db.Model(&domain.CollaborationParticipant{}).
		Where("user_id = ? AND post_id = ?", userId, postId).
		Updates(domain.CollaborationParticipant{
			Status: status,
		}).Error; err != nil {
		log.Println("ERROR: Failed to update status of collaboration participant", err)
		return err
	}
	log.Println("INFO: Successfully updated status of collaboration participant")
	return nil
}

func (r *collaborationParticipantRepository) Delete(userId, postId string) error {
	if err := r.db.Where("user_id = ? AND post_id = ?", userId, postId).Delete(&domain.CollaborationParticipant{}).Error; err != nil {
		log.Println("ERROR: Failed to delete collaboration participant by UserId & PostId", err)
		return err
	}
	log.Println("INFO: Successfully deleted collaboration participant by UserId & PostId")
	return nil
}
