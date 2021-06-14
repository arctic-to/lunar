import { useStore } from './useStore'

export function useSidebar() {
  const { view } = useStore()
  return view.sidebar
}
