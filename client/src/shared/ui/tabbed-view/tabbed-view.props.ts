import { ReactNode } from 'react'

export interface TabbedViewItem {
  label: ReactNode
  content: ReactNode
}

export interface TabbedViewProps {
  tabs: Array<TabbedViewItem>
  // ui props
  className?: string
  labelClassName?: string
  labelsContainerClassName?: string
  selectedLabelClassName?: string
  contentClassName?: string
}
