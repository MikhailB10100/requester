import { ReactNode } from 'react'

export interface TableProps<T> {
  headers: Array<string>
  items: Array<T>
  renderItem: (item: T) => ReactNode
}
