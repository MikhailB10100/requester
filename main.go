package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"main.go/middlewares"
	"main.go/modules/files"
	"main.go/modules/requests"
)

func main() {
	os.Mkdir("upload", 0755)

	db, err := sql.Open("sqlite3", "./database/database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	router := mux.NewRouter()
	router.Use(middlewares.CORSMiddleware())
	router.Use(middlewares.LogRequestInfoMiddleware)
	// router.Use(mux.CORSMethodMiddleware(router))

	requestsController := requests.NewRequestsController(db)

	router.HandleFunc("/requests", requestsController.Create).Methods(http.MethodPost, http.MethodOptions)
	router.HandleFunc("/requests", requestsController.GetMany).Methods(http.MethodGet, http.MethodOptions)
	router.HandleFunc("/requests/{id}", requestsController.Get).Methods(http.MethodGet, http.MethodOptions)
	router.HandleFunc("/requests/{id}", requestsController.Delete).Methods(http.MethodDelete, http.MethodOptions)
	router.HandleFunc("/requests/{id}", requestsController.Update).Methods(http.MethodPatch, http.MethodOptions)
	router.HandleFunc("/requests/send", requestsController.Send).Methods(http.MethodPost, http.MethodOptions)

	filesController := files.NewFilesController()

	router.HandleFunc("/files/upload", filesController.Upload).Methods(http.MethodPost, http.MethodOptions)
	router.Handle("/", http.FileServer(http.Dir("./dist/static")))
	router.Handle("/upload/", http.StripPrefix("/upload", http.FileServer(http.Dir("./upload"))))

	server := &http.Server{
		Handler:      router,
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(server.ListenAndServe())
}
