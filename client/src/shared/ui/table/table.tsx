import React from 'react'
import { TableProps } from './table.props'
import { observer } from 'mobx-react-lite'

function Table<T>({ headers, renderItem, items }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            // static list, index as key allowed
            <td key={index}>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>{items.map((item) => renderItem(item))}</tbody>
    </table>
  )
}

// TODO: Maybe move observer on top layer
export default observer(Table)
