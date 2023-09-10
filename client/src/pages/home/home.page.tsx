import React from 'react'
import PageSection from '../../shared/ui/page-section/page-section'
import { RequestInteraction } from '@src/widgets/request'

function HomePage() {
  return (
    <main className={'flex h-full'}>
      <RequestInteraction />
      <PageSection></PageSection>
    </main>
  )
}

export default HomePage
