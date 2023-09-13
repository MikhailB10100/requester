import React from 'react'
import { ParametersTable } from '@src/widgets/request/request-interaction/shared-components'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import BodyFormDataTableRow from './body-form-data-table-row/body-form-data-table-row'

function BodyFormData() {
  const context = useRequestInteractionContext()

  return (
    <ParametersTable
      parametersController={context.body.data.formData}
      headers={['Enabled', 'Key', 'Type', 'Value', 'Description']}
      renderItem={(item) => <BodyFormDataTableRow key={item.id} item={item} />}
    />
  )
}

export default BodyFormData
