package middlewares

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func CORSMiddleware() mux.MiddlewareFunc {
	return handlers.CORS(
		handlers.AllowedHeaders([]string{"*"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"*"}),
	)
}
