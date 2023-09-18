import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { observer } from 'mobx-react-lite'
import { RequestStatus } from '@src/widgets/request/request-interaction/store/request-interaction-store'
import ResponseData from '@src/widgets/request/request-interaction/core-components/response/response-data/response-data'
import ResponseHeaders from '@src/widgets/request/request-interaction/core-components/response/response-headers/response-headers'
import { TabbedView } from '@src/shared/ui'

function Response() {
  const context = useRequestInteractionContext()
  console.log(context.requestStatus)

  return (
    <div>
      <p>Response</p>
      {context.requestStatus === RequestStatus.UNSUBMITTED ? (
        <p>Response will shown here after request fulfilled</p>
      ) : (
        <TabbedView
          tabs={[
            { label: 'Data', content: <ResponseData /> },
            { label: 'Headers', content: <ResponseHeaders /> },
          ]}
        />
      )}
    </div>
  )
}

export default observer(Response)
