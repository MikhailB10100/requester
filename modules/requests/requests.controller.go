package requests

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type requestsController struct {
	requestsService requestsService
}

func NewRequestsController(db *sql.DB) requestsController {
	return requestsController{
		requestsService: newRequestsService(db),
	}
}

type createRequestBody struct {
	Method string `json:"method"`
	URL    string `json:"url"`
}

func (controller *requestsController) Create(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println("Cannot read body")
		return
	}

	var requestBody createRequestBody
	if err := json.Unmarshal(body, &requestBody); err != nil {
		fmt.Println("Cannot unmarshal body", err)
		return
	}

	id := controller.requestsService.createRequest(requestBody.Method, requestBody.URL)

	w.Write([]byte(fmt.Sprint(id)))
}

func (controller *requestsController) Get(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	requestModel := controller.requestsService.getRequest(id)

	requestJSON, err := json.Marshal(requestModel)

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Write(requestJSON)
}

func (controller *requestsController) GetMany(w http.ResponseWriter, r *http.Request) {

}

func (controller *requestsController) Update(w http.ResponseWriter, r *http.Request) {

}

func (controller *requestsController) Delete(w http.ResponseWriter, r *http.Request) {

}

type requestsSendResponse struct {
	Body    interface{}       `json:"body"`
	Headers map[string]string `json:"headers"`
}

func (controller *requestsController) Send(w http.ResponseWriter, r *http.Request) {
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

	clientRequest, error := http.NewRequest(method, url, bytes.NewBuffer([]byte(body)))
	if error != nil {
		fmt.Println(error)
		return
	}

	clientRequest.Host = r.Host
	clientRequest.Header = http.Header{
		"Host":       {r.Host},
		"User-Agent": {r.UserAgent()},
	}

	for key, value := range headers {
		clientRequest.Header.Set(key, value)
	}

	client := &http.Client{}
	clientResponse, error := client.Do(clientRequest)

	if error != nil {
		fmt.Println(error)
		return
	}

	clientResponseBody, error := io.ReadAll(clientResponse.Body)

	if error != nil {
		fmt.Println(error)
		return
	}

	defer clientResponse.Body.Close()

	clientResponseHeaders := make(map[string]string)

	for key, values := range clientResponse.Header {
		clientResponseHeaders[key] = strings.Join(values, ",")
	}

	responseData := requestsSendResponse{
		Body:    string(clientResponseBody),
		Headers: clientResponseHeaders,
	}

	responseDataJSON, err := json.Marshal(responseData)
	if err != nil {
		fmt.Println("Error encoding to JSON:", err)
		return
	}

	fmt.Println(responseData)

	w.Write(responseDataJSON)
}
