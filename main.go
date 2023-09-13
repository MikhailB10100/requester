package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"strings"
)

func UploadFileHanlder(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(100 << 20)

	file, header, err := r.FormFile("file")
	if err != nil {
		fmt.Println("Error retrieving the file:", err)
		return
	}
	defer file.Close()

	newFile, err := os.Create(path.Join("upload", header.Filename))
	if err != nil {
		fmt.Println("Error creating the new file:", err)
		return
	}
	defer newFile.Close()

	_, err = io.Copy(newFile, file)
	if err != nil {
		fmt.Println("Error copying file data:", err)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Write([]byte("http://127.0.0.1:8080" + "/" + newFile.Name()))
}

func SendHTTPRequest(method string, url string, headers map[string]string, body string) {

}

func LogRequestInfoMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
		fmt.Println(r.Method, r.URL, r.Response.StatusCode)
	})
}

func HandleRequestsSend(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handle requests send")
	error := r.ParseMultipartForm(10 << 20)
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
	server := http.NewServeMux()
	os.Mkdir("upload", 0755)
	server.HandleFunc("/files/upload", UploadFileHanlder)
	server.HandleFunc("/requests/", HandleRequests)

	clientStaticServer := http.FileServer(http.Dir("./dist/static"))
	server.Handle("/", clientStaticServer)

	uploadStaticServer := http.FileServer(http.Dir("./upload"))
	server.Handle("/upload/", http.StripPrefix("/upload", uploadStaticServer))

	http.ListenAndServe(":8080", server)
}
