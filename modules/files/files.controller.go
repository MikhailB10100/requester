package files

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
)

type filesController struct{}

func NewFilesController() filesController {
	return filesController{}
}

func (controller *filesController) Upload(w http.ResponseWriter, r *http.Request) {
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

	w.Write([]byte("http://127.0.0.1:8080" + "/" + newFile.Name()))
}
