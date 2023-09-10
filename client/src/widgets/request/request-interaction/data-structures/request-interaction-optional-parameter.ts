import { action, extendObservable, makeObservable } from 'mobx'
import { uuidv4 } from '@src/shared/utils'

export class RequestInteractionOptionalParameter {
  id = uuidv4()
  included: boolean = false
  key: string = ''
  value: string = ''
  description: string = ''

  constructor(
    included: boolean,
    key: string,
    value: string,
    description: string
  ) {
    extendObservable(this, {
      included,
      key,
      value,
      description,
    })
    makeObservable(this, {
      toggleIncluded: action,
      setKey: action,
      setValue: action,
      setDescription: action,
    })
  }

  toggleIncluded() {
    this.included = !this.included
  }

  setKey(value: string) {
    this.key = value
  }

  setValue(value: string) {
    this.value = value
  }

  setDescription(value: string) {
    this.description = value
  }
}
