import {
  RequestInteractionParametersController,
  RequestInteractionParameter,
} from '@src/widgets/request/request-interaction/data-structures'
import { TableProps } from '@src/shared/ui'

export interface ParametersTableProps<T extends RequestInteractionParameter>
  extends Pick<TableProps<T>, 'headers' | 'renderItem'> {
  parametersController: RequestInteractionParametersController<T>
}
