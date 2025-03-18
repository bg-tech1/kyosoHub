package usecase

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type AuthUsecase interface {
	GenerateToken(userId string) (string, error)
	ValidateToken(tokenString string) (string, error)
}

type authUsecase struct {
	jwtSecret []byte
}

func NewAuthUsecase(secret string) AuthUsecase {
	return &authUsecase{
		jwtSecret: []byte(secret),
	}
}

func (a *authUsecase) GenerateToken(userId string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString(a.jwtSecret)
}

func (a *authUsecase) ValidateToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//署名アルゴリズムのチェック
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return a.jwtSecret, nil
	})
	if err != nil || !token.Valid {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", err
	}
	return (claims["user_id"].(string)), nil
}
