import React from 'react'
import { Form, Response } from './core-components'
import { PageSection } from '@src/shared/ui'
import { RequestInteractionContext } from './context'
import { requestInteractionStore } from './store'

function RequestInteraction() {
  return (
    <RequestInteractionContext.Provider value={requestInteractionStore}>
      <PageSection>
        <Form />
        <Response />
      </PageSection>
    </RequestInteractionContext.Provider>
  )
}

export default RequestInteraction
