package requests

import "database/sql"

type requestsService struct {
	model requestRepository
}

func newRequestsService(db *sql.DB) requestsService {
	return requestsService{
		model: newRequestModel(db),
	}
}

func (service *requestsService) createRequest(method string, url string) int64 {
	return service.model.create(method, url)
}

func (service *requestsService) getRequest(id string) request {
	return service.model.findOne(id)
}
