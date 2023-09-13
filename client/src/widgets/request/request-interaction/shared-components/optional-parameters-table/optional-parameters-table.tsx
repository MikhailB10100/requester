import React from 'react'
import { OptionalParametersTableProps } from './optional-parameters-table.props'
import { ParametersTable } from '../parameters-table'
import OptionalParametersTableItem from './optional-parameters-table-item/optional-parameters-table-item'

function OptionalParametersTable({
  parametersController,
}: OptionalParametersTableProps) {
  return (
    <ParametersTable
      headers={['Enabled', 'Key', 'Value', 'Description']}
      parametersController={parametersController}
      renderItem={(item) => (
        <OptionalParametersTableItem
          key={item.id}
          item={item}
          onDelete={(id) => parametersController.delete(id)}
        />
      )}
    />
  )
}

export default OptionalParametersTable
