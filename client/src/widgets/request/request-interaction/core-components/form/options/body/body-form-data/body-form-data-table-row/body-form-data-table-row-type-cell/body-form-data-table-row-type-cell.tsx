import React from 'react'
import { BodyFormDataTableRowTypeCellProps } from './body-form-data-table-row-type-cell.props'
import { Select } from '@src/shared/ui'
import { RequestModelBodyFormDataParameter } from '@src/entities/request'
import { observer } from 'mobx-react-lite'

const formDataTypes: Array<RequestModelBodyFormDataParameter['type']> = [
  'text',
  'file',
]

function BodyFormDataTableRowTypeCell({
  item,
}: BodyFormDataTableRowTypeCellProps) {
  return (
    <td>
      <Select
        value={item.type}
        options={formDataTypes.map((type) => ({ text: type, value: type }))}
        onValueChange={(value) => item.setType(value)}
      />
    </td>
  )
}

export default observer(BodyFormDataTableRowTypeCell)
