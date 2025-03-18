package main

import (
	"fmt"
	"kyosohub/di"
	"os"
)

func main() {
	// デバック用
	fmt.Println("listening to port 8080", os.Getenv("REACT_APP_FRONT_BASE_URL"))
	// ルート設定
	r := di.InitializeApp()

	r.Run(":8080") // サーバー起動

}
