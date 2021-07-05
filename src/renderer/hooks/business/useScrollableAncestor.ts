import { createContext, useContext } from 'react'

export const ScrollableAncestorContext = createContext<HTMLElement | null>(null)

export function useScrollableAncestor() {
  return useContext(ScrollableAncestorContext)
}
