import { usePlatform } from './usePlatform'

export function useNeteaseProfile() {
  const { netease } = usePlatform()
  return netease.profile?.userId
}
