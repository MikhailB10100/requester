import React from 'react'
import { OptionalParametersTable } from '@src/widgets/request/request-interaction/shared-components'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'

function BodyXWwwFormUrlEncoded() {
  const context = useRequestInteractionContext()

  return (
    <OptionalParametersTable
      parametersController={context.body.data.xWwwUrlEncoded}
    />
  )
}

export default BodyXWwwFormUrlEncoded
