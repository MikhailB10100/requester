import { action, makeObservable, observable, runInAction } from 'mobx'
import { RequestMethod } from '@src/shared/typing'
import { RequestsService, SendRequestResponse } from '@src/entities/request'
import { buildURL } from '@src/shared/utils'
import {
  RequestInteractionOptionalParametersController,
  RequestInteractionPathParameter,
} from '@src/widgets/request/request-interaction/data-structures'
import { getPathParametersFromURLTemplate } from '@src/shared/utils'
import { RequestInteractionBody } from '@src/widgets/request/request-interaction/data-structures/request-interaction-body'

export class RequestInteractionStore {
  method: RequestMethod = 'GET'
  urlTemplate = ''
  headers = new RequestInteractionOptionalParametersController()
  query = new RequestInteractionOptionalParametersController()
  pathParameters: Array<RequestInteractionPathParameter> = []
  body = new RequestInteractionBody('none')

  response: SendRequestResponse = {
    headers: {},
    body: '',
  }

  constructor() {
    makeObservable(this, {
      pathParameters: observable,
      response: observable,
      setMethod: action,
      setURL: action,
      sendRequest: action,
    })
  }

  setMethod(value: RequestMethod) {
    this.method = value
  }

  setURL(value: string) {
    this.urlTemplate = value

    const pathParameters = []

    for (const key of getPathParametersFromURLTemplate(value)) {
      pathParameters.push(new RequestInteractionPathParameter(key, '', ''))
    }

    this.pathParameters = pathParameters
  }

  async sendRequest() {
    // TODO: move try/catch in RequestsService method
    try {
      // TODO: maybe implement class wrapper with toKeyValueObject for RequestInteractionPathParameter
      const parsedPathParameters: Record<string, string> = {}

      for (const { key, value } of this.pathParameters) {
        parsedPathParameters[key] = value
      }

      const response = await RequestsService.send({
        method: this.method,
        url: buildURL(
          this.urlTemplate,
          parsedPathParameters,
          this.query.toKeyValueObject()
        ),
        body: this.body,
        headers: this.headers.toKeyValueObject(),
      })

      runInAction(() => {
        this.response = response.data
      })
    } catch (error: unknown) {
      console.warn(RequestInteractionStore.name, 'sendRequest Error:\n', error)
    }
  }
}

export const requestInteractionStore = new RequestInteractionStore()
