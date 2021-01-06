import { useStore } from '@/models'

export function useCurrentTrack() {
  const { player } = useStore()
  const [currentTrack = undefined] = player.tracks

  return currentTrack
}

export default useCurrentTrack
