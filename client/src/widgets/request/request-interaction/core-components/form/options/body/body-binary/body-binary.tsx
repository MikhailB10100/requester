import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'

function BodyBinary() {
  const context = useRequestInteractionContext()

  return (
    <input
      type={'file'}
      onChange={(event) => {
        if (event.target.files) {
          context.body.data.setBinary(event.target.files[0])
        }
      }}
    />
  )
}

export default BodyBinary
