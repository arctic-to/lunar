import { Context } from 'react'
import { useContext } from 'react'

export function useNonNullableContext<T>(context: Context<T | null>) {
  const store = useContext(context)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
