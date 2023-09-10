import React from 'react'
import { TabbedView } from '@src/shared/ui'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context/request-interaction-context'
import { OptionalParametersTable } from '@src/widgets/request/request-interaction/shared-components'
import PathParameters from './path-parameters/path-parameters'
import Body from './body/body'

function Options() {
  const context = useRequestInteractionContext()

  return (
    <TabbedView
      tabs={[
        {
          label: 'path',
          content: <PathParameters />,
        },
        {
          label: 'query',
          content: (
            <OptionalParametersTable parametersController={context.query} />
          ),
        },
        {
          label: 'headers',
          content: (
            <OptionalParametersTable parametersController={context.headers} />
          ),
        },
        { label: 'body', content: <Body /> },
      ]}
    />
  )
}

export default Options
