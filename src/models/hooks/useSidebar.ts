import { useStore } from './useStrore'

export function useSidebar() {
  const { view } = useStore()
  return view.sidebar
}
