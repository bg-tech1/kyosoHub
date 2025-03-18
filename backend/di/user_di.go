package di

import (
	"kyosohub/handler"
	"kyosohub/repository"
	"kyosohub/usecase"
	"os"

	"gorm.io/gorm"
)

func InitializeUserModule(db *gorm.DB) handler.UserHandler {
	userRepo := repository.NewUserRepository(db)
	profileRepo := repository.NewUserProfileRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepo, profileRepo)
	authUsecase := usecase.NewAuthUsecase(os.Getenv("JWT_SECRET"))
	return handler.NewUserHandler(userUsecase, authUsecase)
}
