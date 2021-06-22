import { useStore } from './useStore'

export function usePlatform() {
  const { platform } = useStore()
  return platform
}
