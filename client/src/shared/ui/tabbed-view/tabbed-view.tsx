import React, { useState } from 'react'
import { TabbedViewProps } from './tabbed-view.props'
import { v4 as uuidv4 } from 'uuid'
import { classnames } from '../../utils'

function TabbedView({
  tabs,
  // ui props
  className,
  labelClassName,
  labelsContainerClassName,
  selectedLabelClassName,
  contentClassName,
}: TabbedViewProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  return (
    <div className={className}>
      <div className={labelsContainerClassName}>
        {tabs.map((tab, index) => (
          <span
            className={classnames(
              'cursor-pointer',
              labelClassName,
              index === selectedTabIndex ? selectedLabelClassName : undefined
            )}
            key={uuidv4()}
            onClick={() => setSelectedTabIndex(index)}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <div className={contentClassName}>{tabs[selectedTabIndex].content}</div>
    </div>
  )
}

export default TabbedView
