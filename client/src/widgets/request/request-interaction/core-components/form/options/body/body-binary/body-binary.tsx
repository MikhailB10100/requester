import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { observer } from 'mobx-react-lite'

function BodyBinary() {
  const context = useRequestInteractionContext()

  return (
    <div>
      <input
        type={'file'}
        onChange={(event) => {
          if (event.target.files) {
            context.body.data.setBinary(event.target.files[0])
          }
        }}
      />
    </div>
  )
}

export default observer(BodyBinary)
