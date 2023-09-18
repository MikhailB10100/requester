package requests

import (
	"database/sql"
	"fmt"
	"time"
)

type requestBody struct {
	Type  string      `json:"type"`
	Value interface{} `json:"value"`
}

type requestParameter struct {
	Id          int    `json:"id"`
	RequestId   int    `json:"requestId"`
	Key         string `json:"key"`
	Value       string `json:"value"`
	Description string `json:"description"`
}

type requestOptionalParameter struct {
	Id          int    `json:"id"`
	RequestId   int    `json:"requestId"`
	Included    bool   `json:"included"`
	Key         string `json:"key"`
	Value       string `json:"value"`
	Description string `json:"description"`
}

type request struct {
	Id              int                        `json:"id"`
	CreatedAt       int                        `json:"createdAt"`
	UpdatedAt       int                        `json:"updatedAt"`
	Method          string                     `json:"method"`
	URL             string                     `json:"url"`
	PathParameters  []requestParameter         `json:"pathParameters"`
	QueryParameters []requestOptionalParameter `json:"queryParameters"`
	Headers         []requestOptionalParameter `json:"headers"`
	Body            requestBody                `json:"body"`
}

type requestRepository struct {
	db *sql.DB
}

func newRequestModel(db *sql.DB) requestRepository {
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS requests (
			id INTEGER PRIMARY KEY,
			created_at INTEGER,
			updated_at INTEGER,
			method TEXT,
			url TEXT
		);
		CREATE TRIGGER IF NOT EXISTS update_timestamp
		AFTER UPDATE ON requests
		FOR EACH ROW
		BEGIN
			UPDATE requests
			SET updated_at = CURRENT_TIMESTAMP
			WHERE id = OLD.id;
		END;
	`)

	if err != nil {
		panic(err)
	}

	return requestRepository{
		db: db,
	}
}

func (model *requestRepository) create(method string, url string) int64 {
	currentTime := time.Now().UnixMilli()

	result, err := model.db.Exec("INSERT INTO requests (created_at, updated_at, method, url) VALUES (?, ?, ?, ?)", currentTime, currentTime, method, url)
	if err != nil {
		fmt.Println(err)
	}

	id, err := result.LastInsertId()

	if err != nil {
		fmt.Println(err)
	}

	return id
}

func (model *requestRepository) findOne(requestID string) request {
	var (
		id        int
		createdAt int
		updatedAt int
		method    string
		url       string
	)

	err := model.db.QueryRow("SELECT * FROM requests WHERE id = ?", requestID).Scan(&id, &createdAt, &updatedAt, &method, &url)
	if err != nil {
		fmt.Println(err)
	}

	return request{
		Id:        id,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
		Method:    method,
		URL:       url,
	}
}

func (model *requestRepository) updateOne() {}

func (model *requestRepository) deleteOne() {}
