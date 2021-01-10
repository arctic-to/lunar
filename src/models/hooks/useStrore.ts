import { useContext, createContext } from 'react'

import { RootStoreInstance } from '../Root'

export const RootStoreContext = createContext<null | RootStoreInstance>(null)

export function useStore() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
