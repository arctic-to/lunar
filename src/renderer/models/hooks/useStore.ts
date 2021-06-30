import { useContext, createContext, Context } from 'react'

import { RootStoreInstance } from '../Root'

export const RootStoreContext: Context<null | RootStoreInstance> =
  createContext<null | RootStoreInstance>(null)

export function useStore(): RootStoreInstance {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
