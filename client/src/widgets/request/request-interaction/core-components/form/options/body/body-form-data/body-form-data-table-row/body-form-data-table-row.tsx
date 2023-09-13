import React from 'react'
import { BodyFormDataTableRowProps } from './body-form-data-table-row.props'
import {
  OptionalParametersTableIncludedCell,
  ParametersTableKeyCell,
  ParametersTableDescriptionCell,
} from '@src/widgets/request/request-interaction/shared-components'
import BodyFormDataTableRowTypeCell from './body-form-data-table-row-type-cell/body-form-data-table-row-type-cell'
import BodyFormDataTableRowValueCell from './body-form-data-table-row-value-cell/body-form-data-table-row-value-cell'

function BodyFormDataTableRow({ item }: BodyFormDataTableRowProps) {
  return (
    <tr>
      <OptionalParametersTableIncludedCell item={item} />
      <ParametersTableKeyCell item={item} />
      <BodyFormDataTableRowTypeCell item={item} />
      <BodyFormDataTableRowValueCell item={item} />
      <ParametersTableDescriptionCell item={item} />
    </tr>
  )
}

export default BodyFormDataTableRow
