package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

func LogRequestInfoMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
		fmt.Println(r.Method, r.URL, r.Response.StatusCode)
	})
}

func HandleRequestsSend(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handle requests send")
	error := r.ParseMultipartForm(10_000)
	if error != nil {
		fmt.Println("Error while parsing Form from request")
		return
	}

	url := r.MultipartForm.Value["url"][0]
	method := r.MultipartForm.Value["method"][0]
	body := r.MultipartForm.Value["body"][0]

	var headers map[string]string
	err := json.Unmarshal([]byte(r.MultipartForm.Value["headers"][0]), &headers)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	request, error := http.NewRequest(method, url, bytes.NewBuffer([]byte(body)))
	if error != nil {
		fmt.Println(error)
		return
	}
	request.Host = r.Host
	request.Header = http.Header{
		"Host": {r.Host},
	}

	for key, value := range headers {
		request.Header.Set(key, value)
	}

	client := &http.Client{}
	response, error := client.Do(request)

	if error != nil {
		fmt.Println(error)
		return
	}

	responseBody, error := io.ReadAll(response.Body)

	if error != nil {
		fmt.Println(error)
		return
	}

	defer response.Body.Close()

	w.Write(responseBody)
}

func HandleRequests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	fmt.Println("handle requests")
	pathParts := strings.Split(r.URL.Path, "/")

	if pathParts[2] == "send" && r.Method == http.MethodPost {
		HandleRequestsSend(w, r)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Write([]byte(nil))
}

func main() {
	http.HandleFunc("/requests/", HandleRequests)
	fs := http.FileServer(http.Dir("./dist/static"))
	http.Handle("/", fs)

	http.ListenAndServe(":8080", nil)
}
