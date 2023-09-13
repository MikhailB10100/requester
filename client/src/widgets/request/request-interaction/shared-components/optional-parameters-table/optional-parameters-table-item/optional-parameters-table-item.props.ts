import { RequestInteractionOptionalParameter } from '@src/widgets/request/request-interaction/data-structures'

export interface OptionalParametersTableItemProps {
  item: RequestInteractionOptionalParameter
  onDelete: (id: string) => void
}
