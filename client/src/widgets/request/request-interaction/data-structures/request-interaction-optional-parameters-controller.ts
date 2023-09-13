import { RequestInteractionParametersController } from './request-interaction-parameters-controller'
import { RequestInteractionOptionalParameter } from './request-interaction-optional-parameter'

export class RequestInteractionOptionalParametersController extends RequestInteractionParametersController<RequestInteractionOptionalParameter> {
  constructor(parameters: Array<RequestInteractionOptionalParameter>) {
    super(
      parameters,
      () => new RequestInteractionOptionalParameter(false, '', '', '')
    )
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
