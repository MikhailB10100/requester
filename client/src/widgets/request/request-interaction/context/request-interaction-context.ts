import { createContext, useContext } from 'react'
import { requestInteractionStore } from '../store'

export const RequestInteractionContext = createContext(requestInteractionStore)

export function useRequestInteractionContext() {
  const context = useContext(RequestInteractionContext)

  if (!context) {
    throw new Error(
      'RequestInteractionContext should be used inside of RequestInteraction'
    )
  }

  return context
}
