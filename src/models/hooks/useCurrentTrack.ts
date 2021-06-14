import { useStore } from './useStore'

export function useCurrentTrack() {
  const { player } = useStore()
  const [currentTrack = undefined] = player.tracks

  return currentTrack
}
