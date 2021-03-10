import { usePlatform } from '@/models'

export function useLiked(id: number | undefined) {
  const { netease } = usePlatform()
  return id === undefined ? false : netease?.likelist?.ids.includes(id)
}
