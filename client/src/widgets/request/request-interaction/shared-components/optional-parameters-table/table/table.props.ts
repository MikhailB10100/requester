import { RequestInteractionOptionalParameter } from '@src/widgets/request/request-interaction/data-structures'

export interface TableProps {
  onDelete: (id: string) => void
  items: Array<RequestInteractionOptionalParameter>
}
