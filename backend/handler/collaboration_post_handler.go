package handler

import (
	"kyosohub/domain"
	"kyosohub/pkg/util"
	"kyosohub/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CollaborationPostHandler interface {
	UpdateParticipationStatusHandler(c *gin.Context)
	UpdatePostHandler(c *gin.Context)
	DeletePostHandler(c *gin.Context)
	GetPostsHandler(c *gin.Context)
	GetParticipationRecordsHandler(c *gin.Context)
	RegisterParticipationHandler(c *gin.Context)
	RegisterPostHandler(c *gin.Context)
}

type collaborationPostHandler struct {
	postUsecase usecase.CollaborationPostUsecase
	authUsecase usecase.AuthUsecase
}

func NewCollaborationPostHandler(postUsecase usecase.CollaborationPostUsecase, authUsecase usecase.AuthUsecase) CollaborationPostHandler {
	return &collaborationPostHandler{postUsecase: postUsecase, authUsecase: authUsecase}
}

func (h *collaborationPostHandler) UpdatePostHandler(c *gin.Context) {
	var updatedPost domain.CollaborationPost
	if err := c.ShouldBindJSON(&updatedPost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userId, err := h.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	updatedPost.UserId = userId
	err = h.postUsecase.UpdatePost(&updatedPost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post updated successfully", "post": updatedPost})
}

func (h *collaborationPostHandler) UpdateParticipationStatusHandler(c *gin.Context) {
	err := h.postUsecase.UpdateParticipationStatus(c.Param("postId"), c.Param("userId"), c.Param("status"))
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized or not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Participation status updated successfully."})
}

func (h *collaborationPostHandler) DeletePostHandler(c *gin.Context) {
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userId, err := h.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	err = h.postUsecase.DeletePost(c.Param("postId"), userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete posts"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}

func (h *collaborationPostHandler) GetPostsHandler(c *gin.Context) {
	scope := c.Query("scope")
	status := c.Query("status")
	userId := c.Query("userId")
	if scope == "all" && status == "any" {
		posts, err := h.postUsecase.GetAllPosts()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get posts"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Get post successfully", "posts": posts})
	} else if scope == "user" && userId == "" {
		token, err := c.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		userId, err := h.authUsecase.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		posts, err := h.postUsecase.GetPostsForUser(userId, status)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get posts"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Get post successfully", "posts": posts})
	} else if scope == "user" && userId != "" {
		posts, err := h.postUsecase.GetPostsForUser(userId, status)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get posts"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Get post successfully", "posts": posts})
	}
}

func (h *collaborationPostHandler) GetParticipationRecordsHandler(c *gin.Context) {
	userId := c.Query("userId")
	postId := c.Query("postId")
	status := c.Query("status")
	if userId == "" && postId == "" {
		token, err := c.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		userId, err := h.authUsecase.ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		participationRecords, err := h.postUsecase.GetParticipationRecords(postId, userId, status)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get participants record"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message":              "Get participants record successfully",
			"participationRecords": participationRecords,
		})
		return
	}
	participationRecords, err := h.postUsecase.GetParticipationRecords(postId, userId, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get participants record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message":              "Get participants record successfully",
		"participationRecords": participationRecords,
	})
}

func (h *collaborationPostHandler) RegisterParticipationHandler(c *gin.Context) {
	var participate domain.CollaborationParticipant
	if err := c.ShouldBindJSON(&participate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userId, err := h.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	participate.UserId = userId
	participate.Id = util.GenerateUUID()
	err = h.postUsecase.RegisterParticipation(&participate)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register participation"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Register participation successfully"})
}

func (h *collaborationPostHandler) RegisterPostHandler(c *gin.Context) {
	var newPost domain.CollaborationPost
	if err := c.ShouldBindJSON(&newPost); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	token, err := c.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	userId, err := h.authUsecase.ValidateToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	newPost.UserId = userId
	newPost.Id = util.GenerateUUID()
	err = h.postUsecase.RegisterPost(&newPost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Post created successfully", "post": newPost})
}
