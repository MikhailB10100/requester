import React from 'react'
import { ParametersTableProps } from './parameters-table.props'
import { RequestInteractionParameter } from '@src/widgets/request/request-interaction/data-structures'
import Table from '@src/shared/ui/table/table'

function ParametersTable<T extends RequestInteractionParameter>({
  renderItem,
  parametersController,
  headers,
}: ParametersTableProps<T>) {
  return (
    <div>
      <Table
        headers={headers}
        items={parametersController.parameters}
        renderItem={renderItem}
      />
      <button onClick={() => parametersController.pushEmpty()}>Append</button>
    </div>
  )
}

export default ParametersTable
