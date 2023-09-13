import React from 'react'
import { OptionalParametersTableIncludedCellProps } from './optional-parameters-table-included-cell.props'
import { observer } from 'mobx-react-lite'

function OptionalParametersTableIncludedCell({
  item,
}: OptionalParametersTableIncludedCellProps) {
  return (
    <td>
      <input
        checked={item.included}
        onChange={(event) => item.setIncluded(event.target.checked)}
        type={'checkbox'}
      />
    </td>
  )
}

export default observer(OptionalParametersTableIncludedCell)
