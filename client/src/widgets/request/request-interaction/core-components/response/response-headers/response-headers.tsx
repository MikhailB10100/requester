import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { observer } from 'mobx-react-lite'

function ResponseHeaders() {
  const context = useRequestInteractionContext()

  return <div>{JSON.stringify(context.response.headers, null, 4)}</div>
}

export default observer(ResponseHeaders)
