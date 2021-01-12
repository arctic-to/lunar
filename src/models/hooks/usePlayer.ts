import { useStore } from './useStrore'

export function usePlayer() {
  const { player } = useStore()

  return player
}
