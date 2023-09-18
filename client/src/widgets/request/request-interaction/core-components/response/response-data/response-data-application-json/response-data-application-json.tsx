import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { observer } from 'mobx-react-lite'

function ResponseDataApplicationJson() {
  const context = useRequestInteractionContext()

  return (
    <p>
      {JSON.stringify(JSON.parse(context.response.body as string), null, 4)}
    </p>
  )
}

export default observer(ResponseDataApplicationJson)
