import { RequestMethod } from '@src/shared/typing'

export type RequestModelBodyFormDataParameter = RequestParameter & {
  type: 'text' | 'file'
}

export type RequestModelBody =
  | {
      type: 'none'
      value: null
    }
  | {
      type: 'form-data'
      value: Array<RequestModelBodyFormDataParameter>
    }
  | {
      type: 'x-www-form-url-encoded'
      value: Array<RequestOptionalParameter>
    }
  | {
      type: 'raw'
      value: string
    }
  | {
      type: 'binary'
      // file source
      value: string
    }

export type RequestModelBodyType = RequestModelBody['type']

export type RequestParameter = {
  key: string
  value: string
  description: string
}

export type RequestOptionalParameter = RequestParameter & { included: boolean }

export interface RequestModel {
  id: string
  createdAt: number
  updatedAt: number
  method: RequestMethod
  url: string
  headers: Array<RequestOptionalParameter>
  query: Array<RequestOptionalParameter>
  params: Array<RequestParameter>
  body: RequestModelBody
}
