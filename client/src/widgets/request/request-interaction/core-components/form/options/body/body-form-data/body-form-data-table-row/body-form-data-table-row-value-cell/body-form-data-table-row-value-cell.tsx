import React from 'react'
import { BodyFormDataTableRowValueCellProps } from './body-form-data-table-row-value-cell.props'
import { observer } from 'mobx-react-lite'
import { ParametersTableValueCell } from '@src/widgets/request/request-interaction/shared-components'

function BodyFormDataTableRowValueCell({
  item,
}: BodyFormDataTableRowValueCellProps) {
  return item.type === 'text' ? (
    <ParametersTableValueCell item={item} />
  ) : (
    <td>
      <input
        type={'file'}
        onChange={(event) => {
          if (event.target.files) {
            item.setValue(event.target.files[0])
          }
        }}
      />
    </td>
  )
}

export default observer(BodyFormDataTableRowValueCell)
