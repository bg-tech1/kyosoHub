package di

import (
	"kyosohub/handler"
	"kyosohub/repository"
	"kyosohub/usecase"
	"os"

	"gorm.io/gorm"
)

func InitializePostHandler(db *gorm.DB) handler.CollaborationPostHandler {
	postRepo := repository.NewCollaborationPostRepository(db)
	participateRepo := repository.NewCollaborationParticipantRepository(db)
	postUsecase := usecase.NewCollaborationPostUsecase(postRepo, participateRepo)
	authUsecase := usecase.NewAuthUsecase(os.Getenv("JWT_SECRET"))
	return handler.NewCollaborationPostHandler(postUsecase, authUsecase)
}
