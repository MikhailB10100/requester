import React from 'react'
import { observer } from 'mobx-react-lite'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context/request-interaction-context'
import Item from './path-parameters-table-item/path-parameters-table-item'

// TODO: think about implementation through ParametersTable
function PathParameters() {
  const context = useRequestInteractionContext()

  return (
    <table>
      <thead>
        <tr>
          <td>Key</td>
          <td>Value</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {context.pathParameters.map((parameter) => (
          <Item key={parameter.id} item={parameter} />
        ))}
      </tbody>
    </table>
  )
}

export default observer(PathParameters)
