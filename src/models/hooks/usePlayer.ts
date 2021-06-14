import { useStore } from './useStore'

export function usePlayer() {
  const { player } = useStore()

  return player
}
