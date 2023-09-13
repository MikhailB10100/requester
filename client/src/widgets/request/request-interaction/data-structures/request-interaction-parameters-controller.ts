import { action, makeObservable, observable } from 'mobx'
import { RequestInteractionParameter } from './request-interaction-parameter'

export class RequestInteractionParametersController<
  T extends RequestInteractionParameter,
> {
  private readonly EMPTY_PARAMETER_CALLBACK: () => T
  parameters: Array<T> = []

  constructor(parameters: Array<T>, emptyParameterCallback: () => T) {
    this.parameters = [...parameters, emptyParameterCallback()]
    this.EMPTY_PARAMETER_CALLBACK = emptyParameterCallback
    // MARK: MobX
    makeObservable(this, {
      parameters: observable,
      pushEmpty: action,
      delete: action,
    })
  }

  pushEmpty() {
    this.parameters.push(this.EMPTY_PARAMETER_CALLBACK())
  }

  delete(id: string) {
    const index = this.parameters.findIndex((parameter) => parameter.id === id)
    if (index !== -1) {
      this.parameters.splice(index, 1)
    }
  }
}
