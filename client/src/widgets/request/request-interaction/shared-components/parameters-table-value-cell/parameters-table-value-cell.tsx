import React from 'react'
import { ParametersTableValueCellProps } from './parameters-table-value-cell.props'
import { observer } from 'mobx-react-lite'

function ParametersTableValueCell({ item }: ParametersTableValueCellProps) {
  return (
    <td>
      <input
        value={item.value}
        onChange={(event) => item.setValue(event.target.value)}
      />
    </td>
  )
}

export default observer(ParametersTableValueCell)
