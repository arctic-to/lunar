import { useStore } from './useStore'

export function useView() {
  const { view } = useStore()
  return view
}
