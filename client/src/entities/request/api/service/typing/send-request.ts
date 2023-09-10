import { RequestMethod } from '@src/shared/typing'

// TODO: maybe replace
export type SendRequestBody = {
  method: RequestMethod
  url: string
  headers: Record<string, string>
  body: unknown
}

export interface SendRequestResponse {
  headers: Record<string, string>
  body: unknown
}
