import { RequestInteractionOptionalParameter } from './request-interaction-optional-parameter'
import { RequestModelBodyFormDataParameter } from '@src/entities/request'
import { action, extendObservable, makeObservable, runInAction } from 'mobx'
import { FilesService } from '@src/entities/files'

export class RequestInteractionBodyFormDataParameter extends RequestInteractionOptionalParameter {
  type: RequestModelBodyFormDataParameter['type'] = 'text'

  constructor(
    type: RequestModelBodyFormDataParameter['type'],
    included: boolean,
    key: string,
    value: string,
    description: string
  ) {
    super(included, key, value, description)
    this.type = type
    // MARK: MobX
    extendObservable(this, { type })
    makeObservable(this, { setType: action })
  }

  setType(value: RequestModelBodyFormDataParameter['type']) {
    this.type = value
    if (value === 'text') {
      // TODO: removing previous file from server request
    }
    this.value = ''
  }

  setValue(value: string | File) {
    // TODO: refactor typing
    if (typeof value === 'string') {
      this.value = value
    } else {
      FilesService.upload(value).then((url) => {
        //
        // TODO: removing previous file from server request
        //
        runInAction(() => {
          this.value = url
        })
      })
    }
  }
}
