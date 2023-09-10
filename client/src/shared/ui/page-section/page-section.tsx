import React from 'react'
import { classnames } from '@src/shared/utils'
import { PageSectionProps } from './page-section.props'

function PageSection({ children, className, ...props }: PageSectionProps) {
  return (
    <section
      {...props}
      className={classnames(
        'first:border-r-2 first:border-r-black first:border-solid grow',
        className
      )}
    >
      {children}
    </section>
  )
}

export default PageSection
