import React from 'react'
import MethodSelect from './method-select/method-select'
import SendButton from './send-button/send-button'
import UrlInput from './url-input/url-input'
import Options from './options/options'

function Form() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={'flex'}>
        <div className={'flex border-2 border-black border-solid'}>
          <MethodSelect />
          <UrlInput />
        </div>
        <SendButton />
      </div>
      <Options />
    </form>
  )
}

export default Form
