import { useStore } from './useStrore'

export function useCurrentTrack() {
  const { player } = useStore()
  const [currentTrack = undefined] = player.tracks

  return currentTrack
}
