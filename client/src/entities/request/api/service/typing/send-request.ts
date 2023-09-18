import { RequestMethod } from '@src/shared/typing'
import { RequestModelBodyType } from '@src/entities/request'

// TODO: maybe replace
export type SendRequestBody = {
  method: RequestMethod
  url: string
  headers: Record<string, string>
  body: {
    type: RequestModelBodyType
    data: string | null
  }
}

export interface SendRequestResponse {
  headers: Record<string, string>
  body: unknown
}
