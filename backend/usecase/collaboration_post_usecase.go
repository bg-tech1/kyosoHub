package usecase

import (
	"errors"
	"kyosohub/domain"
	"kyosohub/repository"
	"log"
)

type CollaborationPostUsecase interface {
	UpdatePost(post *domain.CollaborationPost) error
	UpdateParticipationStatus(postId, userId, status string) error
	DeleteParticipationRecord(postId, userId string) error
	DeletePost(postId, userId string) error
	GetAllPosts() ([]domain.CollaborationPost, error)
	GetPostsForUser(userId string, status string) ([]domain.CollaborationPost, error)
	GetParticipationRecords(postId, userId string, status string) ([]domain.CollaborationParticipant, error)
	RegisterPost(post *domain.CollaborationPost) error
	RegisterParticipation(participant *domain.CollaborationParticipant) error
}

type collaborationPostUsecase struct {
	postRepo       repository.CollaborationPostRepository
	participatRepo repository.CollaborationParticipantRepository
}

func NewCollaborationPostUsecase(postRepo repository.CollaborationPostRepository, participatRepo repository.CollaborationParticipantRepository) CollaborationPostUsecase {
	return &collaborationPostUsecase{postRepo: postRepo, participatRepo: participatRepo}
}

func (u *collaborationPostUsecase) UpdatePost(post *domain.CollaborationPost) error {
	if err := u.postRepo.Update(post); err != nil {
		log.Println("ERROR: Failed to update post", err)
		return err
	}
	log.Println("INFO: Successfully updated post")
	return nil
}

func (u *collaborationPostUsecase) UpdateParticipationStatus(postId, userId, status string) error {
	if err := u.participatRepo.UpdateStatus(userId, postId, status); err != nil {
		log.Println("ERROR: Failed to update participant status", err)
		return err
	}

	log.Println("INFO: Successfully updated participant status")
	return nil
}

func (u *collaborationPostUsecase) DeleteParticipationRecord(postId, userId string) error {
	if err := u.participatRepo.Delete(userId, postId); err != nil {
		log.Println("ERROR: Failed to delete participant", err)
		return err
	}

	log.Println("INFO: Successfully deleted participant")
	return nil
}

func (u *collaborationPostUsecase) DeletePost(postId, userId string) error {
	err := u.postRepo.Delete(postId)
	if err != nil {
		log.Println("ERROR: Failed to delete post", err)
		return err
	}
	log.Println("INFO: Successfully deleted post")
	return nil
}

func (u *collaborationPostUsecase) GetAllPosts() ([]domain.CollaborationPost, error) {
	posts, err := u.postRepo.FindAll()
	if err != nil {
		log.Println("ERROR: Failed to get all posts", err)
		return nil, err
	}
	log.Println("INFO: Successfully fetched all posts")
	return posts, nil
}

func (u *collaborationPostUsecase) GetPostsForUser(userId string, status string) ([]domain.CollaborationPost, error) {
	var posts []domain.CollaborationPost
	var err error
	if status == "recruiting" {
		posts, err = u.postRepo.FindAllByUserId(userId)
		if err != nil {
			log.Println("ERROR: Failed to get participation records for user", err)
			return nil, err
		}
	} else if status == "pending" {
		participantsRecord, err := u.participatRepo.FindByUserId(userId, status)
		if err != nil {
			log.Println("ERROR: Failed to get participation records for user", err)
			return nil, err
		}
		for _, record := range participantsRecord {
			post, err := u.postRepo.FindById(record.PostId)
			if err != nil {
				log.Println("ERROR: Faild to get collaboration post for postId", err)
				return nil, err
			}
			posts = append(posts, *post)
		}
	} else if status == "approved" {
		participantsRecord, err := u.participatRepo.FindByUserId(userId, status)
		if err != nil {
			log.Println("ERROR: Failed to get participation records for user", err)
			return nil, err
		}
		for _, record := range participantsRecord {
			post, err := u.postRepo.FindById(record.PostId)
			if err != nil {
				log.Println("ERROR: Faild to get collaboration post for postId", err)
				return nil, err
			}
			posts = append(posts, *post)
		}
	} else {
		log.Println("ERROR: Invalid status")
		return nil, errors.New("invalid status")
	}
	log.Println("INFO: Successfully fetched posts for user")
	return posts, nil
}

func (u *collaborationPostUsecase) GetParticipationRecords(postId, userId string, status string) ([]domain.CollaborationParticipant, error) {
	var participants []domain.CollaborationParticipant
	var err error
	if postId != "" {
		participants, err = u.participatRepo.FindByPostId(postId, status)
		if err != nil {
			log.Println("ERROR: Failed to get participants by postId", err)
			return nil, err
		}
	} else if userId != "" {
		participants, err = u.participatRepo.FindByUserId(userId, status)
		if err != nil {
			log.Println("ERROR: Failed to get participants by userId", err)
			return nil, err
		}
	} else {
		log.Println("ERROR: Invalid parameters")
		return nil, errors.New("invalid parameters")
	}

	log.Println("INFO: Successfully fetched participants")
	return participants, nil
}

func (u *collaborationPostUsecase) RegisterParticipation(participant *domain.CollaborationParticipant) error {
	if err := u.participatRepo.Create(participant); err != nil {
		log.Println("ERROR: Failed to register participant", err)
		return err
	}
	log.Println("INFO: Successfully registered participant")
	return nil
}

func (u *collaborationPostUsecase) RegisterPost(post *domain.CollaborationPost) error {
	err := u.postRepo.Create(post)
	if err != nil {
		log.Println("ERROR: Failed to create post", err)
		return err
	}
	log.Println("INFO: Successfully created post")
	return nil
}
