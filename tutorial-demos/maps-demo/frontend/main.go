package main

import (
  "github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {

  r := gin.Default()

  r.Use(static.Serve("/", static.LocalFile("./public", true)))
  
	r.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
  })
  
  r.Run(":8080")
}