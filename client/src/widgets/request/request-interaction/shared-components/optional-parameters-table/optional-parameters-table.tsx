import React from 'react'
import { OptionalParametersTableProps } from './optional-parameters-table.props'
import Table from './table/table'

function OptionalParametersTable({
  parametersController,
}: OptionalParametersTableProps) {
  return (
    <div>
      <Table
        items={parametersController.parameters}
        onDelete={(id) => parametersController.delete(id)}
      />
      <button onClick={() => parametersController.pushEmpty()}>Append</button>
    </div>
  )
}

export default OptionalParametersTable
