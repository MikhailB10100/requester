import React from 'react'
import { RequestMethod } from '@src/shared/typing'
import { useRequestInteractionContext } from '@src/widgets/request/request-interaction/context/request-interaction-context'
import { Select } from '@src/shared/ui'

const requestMethods: Array<RequestMethod> = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'HEAD',
]

function MethodSelect() {
  const context = useRequestInteractionContext()

  return (
    <Select
      options={requestMethods.map((method) => ({
        text: method,
        value: method,
      }))}
      onValueChange={(value) => context.setMethod(value as RequestMethod)}
      className={'h-full border-r-2 border-r-black w-[108px]'}
      selectedTextClassName={'flex items-center w-full'}
      optionClassName={'[&:not(:last-child)]:border-b-2 border-b-black'}
    />
  )
}

export default MethodSelect
