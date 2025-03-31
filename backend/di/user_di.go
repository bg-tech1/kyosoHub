package di

import (
	"kyosohub/handler"
	"kyosohub/pkg/storage"
	"kyosohub/repository"
	"kyosohub/usecase"
	"os"

	"gorm.io/gorm"
)

func InitializeUserModule(db *gorm.DB) handler.UserHandler {
	userRepo := repository.NewUserRepository(db)
	profileRepo := repository.NewUserProfileRepository(db)
	storageService := storage.NewS3StorageService()
	userUsecase := usecase.NewUserUsecase(userRepo, profileRepo, storageService)
	authUsecase := usecase.NewAuthUsecase(os.Getenv("JWT_SECRET"))
	return handler.NewUserHandler(userUsecase, authUsecase)
}
