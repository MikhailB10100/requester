import { uuidv4 } from '@src/shared/utils'
import { action, extendObservable, makeObservable } from 'mobx'

export class RequestInteractionPathParameter {
  readonly id = uuidv4()
  readonly key: string
  description = ''
  value = ''

  constructor(key: string, value: string, description: string) {
    this.key = key
    extendObservable(this, {
      value,
      description,
    })
    makeObservable(this, {
      setValue: action,
      setDescription: action,
    })
  }

  setValue(value: string) {
    this.value = value
  }

  setDescription(value: string) {
    this.description = value
  }
}
