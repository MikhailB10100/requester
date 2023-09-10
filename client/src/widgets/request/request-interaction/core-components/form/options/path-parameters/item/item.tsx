import React from 'react'
import { ItemProps } from './item.props'
import { observer } from 'mobx-react-lite'

function Item({ item }: ItemProps) {
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

export default observer(Item)
