import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'

function UrlInput() {
  const context = useRequestInteractionContext()

  return (
    <input
      className={'py-2 px-2'}
      onChange={(e) => context.setURL(e.target.value)}
    />
  )
}

export default UrlInput
