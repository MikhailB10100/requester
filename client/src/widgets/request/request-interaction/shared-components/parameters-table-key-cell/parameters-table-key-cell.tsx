import React from 'react'
import { ParametersTableKeyCellProps } from './parameters-table-key-cell.props'
import { observer } from 'mobx-react-lite'

function ParametersTableKeyCell({ item }: ParametersTableKeyCellProps) {
  return (
    <td>
      <input
        value={item.key}
        onChange={(event) => item.setKey(event.target.value)}
      />
    </td>
  )
}

export default observer(ParametersTableKeyCell)
