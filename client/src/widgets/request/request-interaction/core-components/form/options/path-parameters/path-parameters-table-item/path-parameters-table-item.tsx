import React from 'react'
import { PathParametersTableItemProps } from './path-parameters-table-item.props'
import { observer } from 'mobx-react-lite'

function PathParametersTableItem({ item }: PathParametersTableItemProps) {
  return (
    <tr>
      <td>{item.key}</td>
      <td>
        <input
          value={item.value}
          onChange={(event) => item.setValue(event.target.value)}
        />
      </td>
      <td>
        <input
          value={item.description}
          onChange={(event) => item.setDescription(event.target.value)}
        />
      </td>
    </tr>
  )
}

export default observer(PathParametersTableItem)
