import React from 'react'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { observer } from 'mobx-react-lite'
import ResponseDataApplicationJson from './response-data-application-json/response-data-application-json'
import ResponseDataUnsupported from './response-data-unsupported/response-data-unsupported'
import ResponseDataEmpty from './response-data-empty/response-data-empty'

function ResponseData() {
  const context = useRequestInteractionContext()

  const isResponseDataExists =
    'Content-Type' in context.response.headers &&
    context.response.headers['Content-Type'] &&
    context.response.body

  if (!isResponseDataExists) {
    return <ResponseDataEmpty />
  }

  switch (context.response.headers['Content-Type'].split(';')[0]) {
    case 'application/json':
      return <ResponseDataApplicationJson />
    default:
      return <ResponseDataUnsupported />
  }
}

export default observer(ResponseData)
