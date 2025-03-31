package handler

import (
	"kyosohub/domain"
	"kyosohub/usecase"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler interface {
	LoginHandler(c *gin.Context)
	LogoutHandler(c *gin.Context)
	RegisterHandler(c *gin.Context)
	GuestLoginHandler(c *gin.Context)
	GetUserInfoHandler(c *gin.Context)
	GetUserProfileHandler(c *gin.Context)
	UpdateUserProfileHandler(c *gin.Context)
	UpdateAvatarHandler(c *gin.Context)
	DeleteUserProfileHandler(c *gin.Context)
	RegisterUserProfileHandler(c *gin.Context)
}

type userHandler struct {
	userUsecase usecase.UserUsecase
	authUsecase usecase.AuthUsecase
}

func NewUserHandler(u usecase.UserUsecase, a usecase.AuthUsecase) UserHandler {
	return &userHandler{userUsecase: u, authUsecase: a}
}

func (u *userHandler) LogoutHandler(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

func (u *userHandler) LoginHandler(c *gin.Context) {
	var userInput domain.User
	if err := c.BindJSON(&userInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	userInfo, err := u.userUsecase.LoginUser(userInput.Email, userInput.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "User not found"})
		return
	}
	token, err := u.authUsecase.GenerateToken(userInfo.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	c.SetCookie("jwt", token, 18000, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func (u *userHandler) RegisterHandler(c *gin.Context) {
	var user domain.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	if err := u.userUsecase.RegisterUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}
	token, err := u.authUsecase.GenerateToken(user.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	c.SetCookie("jwt", token, 18000, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Register successful"})
}

func (u *userHandler) GuestLoginHandler(c *gin.Context) {
	token, err := u.authUsecase.GenerateToken("guest")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	c.SetCookie("jwt", token, 18000, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Guest login successful"})
}

func (u *userHandler) GetUserInfoHandler(c *gin.Context) {
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userId, err := u.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userInfo, err := u.userUsecase.GetUserInfo(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"userId": userInfo.Id, "email": userInfo.Email, "UserProfile": userInfo.UserProfile})
}

func (u *userHandler) GetUserProfileHandler(c *gin.Context) {
	if c.Query("userId") != "" {
		profile, err := u.userUsecase.GetUserProfile(c.Query("userId"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user profile"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"userProfile": profile})
		return
	} else if c.Query("userIds[]") != "" {
		userIds := c.QueryArray("userIds[]")
		var UserProfiles []domain.UserProfile
		for _, userId := range userIds {
			userProfile, err := u.userUsecase.GetUserProfile(userId)
			UserProfiles = append(UserProfiles, *userProfile)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
				return
			}
		}
		c.JSON(http.StatusOK, gin.H{"userProfiles": UserProfiles})
		return
	} else {
		token, err := c.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		userId, err := u.authUsecase.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		profile, err := u.userUsecase.GetUserProfile(userId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user profile"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"userProfile": profile})
	}
}

func (u *userHandler) UpdateAvatarHandler(c *gin.Context) {
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userId, err := u.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	file, fileHeader, err := c.Request.FormFile("avatar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file"})
		return
	}

	if fileHeader.Size > 5*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image size must be less than 5MB"})
		return
	}

	contentType := fileHeader.Header.Get("Content-Type")
	if contentType != "image/jpeg" && contentType != "image/png" && contentType != "image/gif" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only JPG, PNG, and GIF formats are supported"})
		return
	}

	if err := u.userUsecase.UpdateAvatar(userId, file, fileHeader); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update avatar"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Avatar updated successfully"})
}

func (u *userHandler) UpdateUserProfileHandler(c *gin.Context) {
	var profile domain.UserProfile
	if err := c.BindJSON(&profile); err != nil {
		log.Println("ERROR: Invalid JSON", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userId, err := u.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	profile.UserId = userId
	if err := u.userUsecase.UpdateUserProfile(&profile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user profile"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User profile updated successfully"})
}

func (u *userHandler) DeleteUserProfileHandler(c *gin.Context) {
	if err := u.userUsecase.DeleteUserProfile(c.Param("id")); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user profile"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User profile deleted successfully"})
}

func (u *userHandler) RegisterUserProfileHandler(c *gin.Context) {
	var profile domain.UserProfile
	if err := c.BindJSON(&profile); err != nil {
		log.Println("ERROR: Invalid JSON", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}
	if err := u.userUsecase.RegisterUserProfile(&profile); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user profile"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User profile registered successfully"})
}
