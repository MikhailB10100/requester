import { RequestParameter } from '@src/entities/request'
import { uuidv4 } from '@src/shared/utils'
import { action, extendObservable, makeObservable } from 'mobx'

export class RequestInteractionParameter implements RequestParameter {
  readonly id = uuidv4()
  key = ''
  value = ''
  description = ''

  constructor(key: string, value: string, description: string) {
    extendObservable(this, { key, value, description })
    makeObservable(this, {
      setKey: action,
      setValue: action,
      setDescription: action,
    })
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
