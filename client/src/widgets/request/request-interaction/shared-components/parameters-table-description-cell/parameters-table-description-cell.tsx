import React from 'react'
import { ParametersTableDescriptionCellProps } from './parameters-table-description-cell.props'
import { observer } from 'mobx-react-lite'

function ParametersTableDescriptionCell({
  item,
}: ParametersTableDescriptionCellProps) {
  return (
    <td>
      <input
        value={item.description}
        onChange={(event) => item.setDescription(event.target.value)}
      />
    </td>
  )
}

export default observer(ParametersTableDescriptionCell)
