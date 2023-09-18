import { action, makeObservable, observable, runInAction } from 'mobx'
import { RequestMethod } from '@src/shared/typing'
import { RequestsService, SendRequestResponse } from '@src/entities/request'
import { buildURL } from '@src/shared/utils'
import {
  RequestInteractionPathParameter,
  RequestInteractionBody,
  RequestInteractionOptionalParametersController,
} from '@src/widgets/request/request-interaction/data-structures'
import { getPathParametersFromURLTemplate } from '@src/shared/utils'

export enum RequestStatus {
  UNSUBMITTED = 'UNSUBMITTED',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
}

export class RequestInteractionStore {
  method: RequestMethod = 'GET'
  urlTemplate = ''
  headers = new RequestInteractionOptionalParametersController([])
  query = new RequestInteractionOptionalParametersController([])
  pathParameters: Array<RequestInteractionPathParameter> = []
  body = new RequestInteractionBody('none', [], [], '', undefined)
  requestStatus = RequestStatus.UNSUBMITTED

  response: SendRequestResponse = {
    headers: {},
    body: '',
  }

  constructor() {
    makeObservable(this, {
      requestStatus: observable,
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

  sendRequest() {
    this.requestStatus = RequestStatus.PENDING

    // TODO: move try/catch in RequestsService method
    try {
      // TODO: maybe implement class wrapper with toKeyValueObject for RequestInteractionPathParameter
      const parsedPathParameters: Record<string, string> = {}

      for (const { key, value } of this.pathParameters) {
        parsedPathParameters[key] = value
      }

      RequestsService.send({
        method: this.method,
        url: buildURL(
          this.urlTemplate,
          parsedPathParameters,
          this.query.toKeyValueObject()
        ),
        body: {
          type: this.body.selectedType,
          data: this.body.getSelectedValue(),
        },
        headers: this.headers.toKeyValueObject(),
      }).then((response) => {
        runInAction(() => {
          this.response = response.data
          this.requestStatus = RequestStatus.FULFILLED
        })
      })
    } catch (error: unknown) {
      console.warn(RequestInteractionStore.name, 'sendRequest Error:\n', error)
    }
  }
}

export const requestInteractionStore = new RequestInteractionStore()
