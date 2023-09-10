import { $api } from '@src/shared/http'
import { SendRequestBody, SendRequestResponse } from './typing'
import { RequestModel } from '@src/entities/request'

class RequestsService {
  static async send(data: SendRequestBody) {
    const formData = new FormData()

    formData.append('url', data.url)
    formData.append('method', data.method)
    formData.append('headers', JSON.stringify(data.headers))
    formData.append('body', JSON.stringify(data.body))

    return $api.post<SendRequestResponse>('/requests/send', formData)
  }

  static async create() {}

  static async getOne(id: string) {
    return $api.get<RequestModel>(`/requests/${id}`)
  }

  static async update(id: string, update: {}) {}

  static async getDelete(id: string) {
    return $api.delete<undefined>(`/requests/${id}`)
  }
}

export default RequestsService
