package middlewares

import (
	"fmt"
	"net/http"

	"github.com/urfave/negroni"
)

func LogRequestInfoMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		lrw := negroni.NewResponseWriter(w)
		next.ServeHTTP(lrw, r)

		fmt.Println(r.Method, r.URL, lrw.Status())
	})
}
