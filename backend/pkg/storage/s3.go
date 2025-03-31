package storage

import (
	"bytes"
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

type StorageService interface {
	UploadFile(file multipart.File, fileHeader *multipart.FileHeader, userId string) (string, error)
}

type S3StorageService struct {
	bucketName string
	region     string
	awsProfile string
	env        string
}

func NewS3StorageService() StorageService {
	bucketName := os.Getenv("AWS_S3_BUCKET_NAME")
	region := os.Getenv("AWS_S3_REGION")
	awsProfile := os.Getenv("AWS_PROFILE") // ローカル開発用
	env := os.Getenv("ENV")                // 本番環境では "production" とする

	if bucketName == "" || region == "" {
		log.Fatal("ERROR: AWS S3環境変数が設定されていません")
	}

	return &S3StorageService{
		bucketName: bucketName,
		region:     region,
		awsProfile: awsProfile,
		env:        env,
	}
}

func (s *S3StorageService) UploadFile(file multipart.File, fileHeader *multipart.FileHeader, userId string) (string, error) {
	var sess *session.Session
	var err error

	if s.env == "prd" {
		sess, err = session.NewSession(&aws.Config{
			Region: aws.String(s.region),
		})
	} else {
		sess, err = session.NewSessionWithOptions(session.Options{
			Profile: s.awsProfile,
			Config: aws.Config{
				Region: aws.String(s.region),
			},
		})
	}

	if err != nil {
		log.Printf("ERROR: AWSセッションの作成に失敗しました: %v", err)
		return "", err
	}

	buffer := make([]byte, fileHeader.Size)
	if _, err := file.Read(buffer); err != nil {
		log.Printf("ERROR: ファイルの読み込みに失敗しました: %v", err)
		return "", err
	}
	defer file.Close()

	ext := filepath.Ext(fileHeader.Filename)
	fileName := fmt.Sprintf("avatars/%s_%d%s", userId, time.Now().UnixNano(), ext)

	uploader := s3manager.NewUploader(sess)
	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket:      aws.String(s.bucketName),
		Key:         aws.String(fileName),
		Body:        bytes.NewReader(buffer),
		ContentType: aws.String(fileHeader.Header.Get("Content-Type")),
	})

	if err != nil {
		log.Printf("ERROR: S3へのアップロードに失敗しました: %v", err)
		return "", err
	}

	log.Printf("INFO: 画像が正常にアップロードされました: %s", result.Location)
	return fileName, nil
}
