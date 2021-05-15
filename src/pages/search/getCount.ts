import { CloudSearchResponse } from '@/data'

export function getCount(data: CloudSearchResponse | undefined) {
  if (!data) return 0

  const { result } = data
  if ('songCount' in result) return result.songCount
  if ('artistCount' in result) return result.artistCount
  if ('playlistCount' in result) return result.playlistCount
  if ('userprofileCount' in result) return result.userprofileCount
}
