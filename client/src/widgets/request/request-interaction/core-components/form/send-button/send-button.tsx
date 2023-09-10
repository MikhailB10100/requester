import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context/request-interaction-context'

function SendButton() {
  const context = useRequestInteractionContext()

  return (
    <button
      onClick={() => context.sendRequest()}
      type={'submit'}
      className={'bg-blue-700 rounded-lg py-2 px-4 text-white'}
    >
      Send
    </button>
  )
}

export default SendButton
