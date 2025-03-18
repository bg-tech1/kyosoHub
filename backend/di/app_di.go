package di

import (
	"kyosohub/infra"

	"github.com/gin-gonic/gin"
)

func InitializeApp() *gin.Engine {
	db, err := infra.NewDB()
	if err != nil {
		panic("Failed to connect to database")
	}

	userHandler := InitializeUserModule(db)
	postHandler := InitializePostHandler(db)
	return infra.NewRouter(userHandler, postHandler)
}
