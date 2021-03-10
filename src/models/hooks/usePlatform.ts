import { useStore } from './useStrore'

export function usePlatform() {
  const { platform } = useStore()
  return platform
}
