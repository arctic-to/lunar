import { useStore } from './useStrore'

export function useView() {
  const { view } = useStore()

  return view
}
