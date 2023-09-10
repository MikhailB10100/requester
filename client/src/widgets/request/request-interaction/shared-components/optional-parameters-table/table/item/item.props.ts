import { RequestInteractionOptionalParameter } from '@src/widgets/request/request-interaction/data-structures'

export interface ItemProps {
  item: RequestInteractionOptionalParameter
  onDelete: (id: string) => void
}
