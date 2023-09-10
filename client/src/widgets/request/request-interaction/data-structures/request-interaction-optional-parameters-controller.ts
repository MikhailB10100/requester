import { RequestInteractionOptionalParameter } from './request-interaction-optional-parameter'
import { makeAutoObservable } from 'mobx'

export class RequestInteractionOptionalParametersController {
  parameters: Array<RequestInteractionOptionalParameter> = []

  constructor() {
    this.pushEmpty()
    makeAutoObservable(this)
  }

  pushEmpty() {
    this.parameters.push(
      new RequestInteractionOptionalParameter(false, '', '', '')
    )
  }

  delete(id: string) {
    const index = this.parameters.findIndex((parameter) => parameter.id === id)
    if (index !== -1) {
      this.parameters.splice(index, 1)
    }
  }

  toKeyValueObject(): Record<string, string> {
    const object: Record<string, string> = {}

    for (const { included, key, value } of this.parameters) {
      if (included && key !== '') {
        object[key] = value
      }
    }

    return object
  }
}
