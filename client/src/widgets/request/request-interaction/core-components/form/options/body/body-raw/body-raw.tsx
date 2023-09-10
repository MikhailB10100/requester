import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { observer } from 'mobx-react-lite'

function BodyRaw() {
  const context = useRequestInteractionContext()

  return (
    <textarea
      value={context.body.data.raw}
      onChange={(event) => context.body.data.setRaw(event.target.value)}
    />
  )
}

export default observer(BodyRaw)
