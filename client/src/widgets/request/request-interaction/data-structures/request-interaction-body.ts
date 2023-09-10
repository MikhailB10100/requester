import {
  RequestModelBodyFormDataParameter,
  RequestModelBodyType,
  RequestOptionalParameter,
} from '@src/entities/request'
import { action, extendObservable, makeObservable } from 'mobx'

export class RequestInteractionBodyData {
  'form-data': Array<RequestModelBodyFormDataParameter> = []
  'x-www-url-encoded': Array<RequestOptionalParameter> = []
  raw: string = ''
  binary: File | undefined = undefined

  constructor(raw: string, binary: File | undefined) {
    extendObservable(this, { raw, binary })
    makeObservable(this, {
      setRaw: action,
      setBinary: action,
    })
  }

  setRaw(value: string) {
    this.raw = value
  }

  setBinary(value: File) {
    this.binary = value
  }
}

export class RequestInteractionBody {
  selectedType: RequestModelBodyType
  data: RequestInteractionBodyData = new RequestInteractionBodyData(
    '',
    undefined
  )

  constructor(
    selectedType: RequestModelBodyType
    // data: RequestInteractionBodyData
  ) {
    this.selectedType = selectedType
    // this.data = data

    extendObservable(this, { selectedType })
    makeObservable(this, {
      setSelectedType: action,
    })
  }

  setSelectedType(value: RequestModelBodyType) {
    this.selectedType = value
  }
}
