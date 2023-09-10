import React from 'react'
import { TableProps } from './table.props'
import { observer } from 'mobx-react-lite'
import Item from './item/item'

function Table({ onDelete, items }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <td>Enabled</td>
          <td>Name</td>
          <td>Value</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  )
}

export default observer(Table)
