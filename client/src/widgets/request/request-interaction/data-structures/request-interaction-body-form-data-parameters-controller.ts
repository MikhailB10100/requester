import { RequestInteractionParametersController } from './request-interaction-parameters-controller'
import { RequestInteractionBodyFormDataParameter } from './request-interaction-body-form-data-parameter'

export class RequestInteractionBodyFormDataParametersController extends RequestInteractionParametersController<RequestInteractionBodyFormDataParameter> {
  constructor(parameters: Array<RequestInteractionBodyFormDataParameter>) {
    super(
      parameters,
      () =>
        new RequestInteractionBodyFormDataParameter('text', false, '', '', '')
    )
  }

  toDataArray() {
    // TODO: refactor typing
    const array: Array<{ key: string; value: string; type: 'text' | 'file' }> =
      []

    for (const { included, key, value, type } of this.parameters) {
      if (included && key !== '') {
        array.push({ key, value, type })
      }
    }

    return array
  }
}
