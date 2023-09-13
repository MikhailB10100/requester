import { $api } from '@src/shared/http'

export class FilesService {
  // Upload file to a server.
  // @returns {string} File url
  static async upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $api.post<string>('/files/upload', formData)

    return response.data
  }
}
