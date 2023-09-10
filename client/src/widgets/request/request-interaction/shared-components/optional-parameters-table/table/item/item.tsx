import React from 'react'
import { observer } from 'mobx-react-lite'
import { ItemProps } from './item.props'

function Item({ item, onDelete }: ItemProps) {
  return (
    <tr>
      <td>
        <input
          checked={item.included}
          onChange={() => item.toggleIncluded()}
          type={'checkbox'}
        />
      </td>
      <td>
        <input
          value={item.key}
          onChange={(event) => item.setKey(event.target.value)}
        />
      </td>
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
