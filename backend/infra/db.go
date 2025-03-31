package infra

import (
	"fmt"
	"kyosohub/domain"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDB() (*gorm.DB, error) {
	var err error
	var dsn string
	var db *gorm.DB
	if os.Getenv("ENV") == "local" {
		dsn = fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("POSTGRES_LOCAL_HOSTNAME"),
			os.Getenv("DB_PORT"),
			os.Getenv("POSTGRES_LOCAL_USER"),
			os.Getenv("POSTGRES_LOCAL_PASSWORD"),
			os.Getenv("POSTGRES_LOCAL_DB"),
		)
	} else {
		dsn = fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			os.Getenv("POSTGRES_HOSTNAME"),
			os.Getenv("DB_PORT"),
			os.Getenv("POSTGRES_USER"),
			os.Getenv("POSTGRES_PASSWORD"),
			os.Getenv("POSTGRES_DB"),
		)
	}

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return nil, err
	}

	// テーブルを自動マイグレーション
	err = db.AutoMigrate(&domain.User{}, &domain.UserProfile{}, &domain.CollaborationPost{}, &domain.CollaborationParticipant{})
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
		return nil, err
	}
	fmt.Println("Initializing database successful")
	return db, nil
}
