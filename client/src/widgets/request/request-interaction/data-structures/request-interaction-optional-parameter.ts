import { action, extendObservable, makeObservable } from 'mobx'
import { RequestInteractionParameter } from './request-interaction-parameter'

export class RequestInteractionOptionalParameter extends RequestInteractionParameter {
  included: boolean = false

  constructor(
    included: boolean,
    key: string,
    value: string,
    description: string
  ) {
    super(key, value, description)
    extendObservable(this, {
      included,
    })
    makeObservable(this, {
      setIncluded: action,
    })
  }

  setIncluded(value: boolean) {
    this.included = value
  }
}
