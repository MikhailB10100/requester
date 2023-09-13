import { RequestMethod } from '@src/shared/typing'
import { AxiosHeaders } from 'axios'
import { RequestModelBodyType } from '@src/entities/request'

// TODO: maybe replace
export type SendRequestBody = {
  method: RequestMethod
  url: string
  headers: AxiosHeaders
  body: {
    type: RequestModelBodyType
    data: string | null
  }
}

export interface SendRequestResponse {
  headers: Record<string, string>
  body: unknown
}
