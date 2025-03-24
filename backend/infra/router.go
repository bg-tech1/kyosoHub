package infra

import (
	"kyosohub/handler"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(h handler.UserHandler, p handler.CollaborationPostHandler) *gin.Engine {
	r := gin.Default()
	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("REACT_APP_FRONT_BASE_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	r.DELETE("/post/:postId", p.DeletePostHandler)
	r.DELETE("/user/profile/:id", h.DeleteUserProfileHandler)
	r.GET("/healthz", func(c *gin.Context) { c.JSON(200, gin.H{"message": "ok"}) })
	r.GET("/participationRecords", p.GetParticipationRecordsHandler)
	r.GET("/posts", p.GetPostsHandler)
	r.GET("/user/info", h.GetUserInfoHandler)
	r.GET("/user/profile", h.GetUserProfileHandler)
	r.PATCH("/post", p.UpdatePostHandler)
	r.PATCH("/participation/:userId/:postId/:status", p.UpdateParticipationStatusHandler)
	r.POST("/auth/login", h.LoginHandler)
	r.POST("/auth/logout", h.LogoutHandler)
	r.POST("/participation", p.RegisterParticipationHandler)
	r.POST("/post", p.RegisterPostHandler)
	r.POST("/user/profile", h.RegisterUserProfileHandler)
	r.POST("/user", h.RegisterHandler)
	r.PUT("/user/profile", h.UpdateUserProfileHandler)
	return r
}
