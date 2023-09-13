import React from 'react'
import { OptionalParametersTableItemProps } from './optional-parameters-table-item.props'
import { OptionalParametersTableIncludedCell } from '../../optional-parameters-table-included-cell'
import { ParametersTableKeyCell } from '../../parameters-table-key-cell'
import { ParametersTableValueCell } from '../../parameters-table-value-cell'
import { ParametersTableDescriptionCell } from '../../parameters-table-description-cell'

function OptionalParametersTableItem({
  item,
  onDelete,
}: OptionalParametersTableItemProps) {
  return (
    <tr>
      <OptionalParametersTableIncludedCell item={item} />
      <ParametersTableKeyCell item={item} />
      <ParametersTableValueCell item={item} />
      <ParametersTableDescriptionCell item={item} />
    </tr>
  )
}

export default OptionalParametersTableItem
