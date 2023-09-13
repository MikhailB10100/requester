import { RequestModelBodyType } from '@src/entities/request'
import { action, extendObservable, makeObservable, runInAction } from 'mobx'
import { RequestInteractionBodyFormDataParameter } from './request-interaction-body-form-data-parameter'
import { RequestInteractionBodyFormDataParametersController } from './request-interaction-body-form-data-parameters-controller'
import { RequestInteractionOptionalParametersController } from './request-interaction-optional-parameters-controller'
import { RequestInteractionOptionalParameter } from './request-interaction-optional-parameter'
import { FilesService } from '@src/entities/files'

export class RequestInteractionBodyData {
  formData: RequestInteractionBodyFormDataParametersController
  xWwwUrlEncoded: RequestInteractionOptionalParametersController
  raw: string = ''
  binary: string | undefined = undefined

  constructor(
    formDataParameters: Array<RequestInteractionBodyFormDataParameter>,
    xWwwUrlEncodedParameters: Array<RequestInteractionOptionalParameter>,
    raw: string,
    binary: string | undefined
  ) {
    this.formData = new RequestInteractionBodyFormDataParametersController(
      formDataParameters
    )
    this.xWwwUrlEncoded = new RequestInteractionOptionalParametersController(
      xWwwUrlEncodedParameters
    )
    // MARK: MobX
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
    FilesService.upload(value).then((url) => {
      //
      // TODO: removing previous file from server request
      //
      runInAction(() => {
        this.binary = url
      })
    })
  }
}

export class RequestInteractionBody {
  selectedType: RequestModelBodyType
  data: RequestInteractionBodyData

  constructor(
    selectedType: RequestModelBodyType,
    formDataParameters: Array<RequestInteractionBodyFormDataParameter>,
    xWwwUrlEncodedParameters: Array<RequestInteractionOptionalParameter>,
    raw: string,
    binary: string | undefined
  ) {
    this.selectedType = selectedType
    this.data = new RequestInteractionBodyData(
      formDataParameters,
      xWwwUrlEncodedParameters,
      raw,
      binary
    )

    extendObservable(this, { selectedType })
    makeObservable(this, {
      setSelectedType: action,
    })
  }

  setSelectedType(value: RequestModelBodyType) {
    this.selectedType = value
  }

  getSelectedValue() {
    switch (this.selectedType) {
      case 'none':
        return null
      case 'form-data':
        return JSON.stringify(this.data.formData.toDataArray())
      case 'x-www-form-url-encoded':
        // TODO: refactor
        return this.data.xWwwUrlEncoded.parameters
          .map(
            ({ key, value }) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join('&')
      case 'raw':
        return this.data.raw
      case 'binary':
        return this.data.binary || null
      default:
        throw new Error(`Unexpected body type: ${this.selectedType}`)
    }
  }
}
