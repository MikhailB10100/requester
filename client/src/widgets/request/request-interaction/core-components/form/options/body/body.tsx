import React, { ReactNode } from 'react'
import { RequestModelBodyType } from '@src/entities/request'
import BodyBinary from './body-binary/body-binary'
import BodyNone from './body-none/body-none'
import BodyRaw from './body-raw/body-raw'
import BodyFormData from './body-form-data/body-form-data'
import BodyXWwwFormUrlEncoded from './body-x-www-form-url-encoded/body-x-www-form-url-encoded'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context'
import { Select } from '@src/shared/ui'
import { observer } from 'mobx-react-lite'

const bodyContext: Record<RequestModelBodyType, ReactNode> = {
  'x-www-form-url-encoded': <BodyXWwwFormUrlEncoded />,
  'form-data': <BodyFormData />,
  binary: <BodyBinary />,
  none: <BodyNone />,
  raw: <BodyRaw />,
}

const bodyTypes = Object.keys(bodyContext) as Array<RequestModelBodyType>

function Body() {
  const context = useRequestInteractionContext()

  return (
    <div>
      <Select
        options={bodyTypes.map((item) => ({
          text: item,
          value: item,
        }))}
        onValueChange={(value) => context.body.setSelectedType(value)}
      />
      <div>{bodyContext[context.body.selectedType]}</div>
    </div>
  )
}

export default observer(Body)
