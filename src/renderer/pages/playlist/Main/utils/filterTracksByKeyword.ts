import { toLower } from 'lodash'

import { SongSnapshotIn } from '@/models'

export default function filterTracksByKeyword(
  tracks: SongSnapshotIn[],
  keyword: string,
) {
  if (!keyword) return tracks
  return tracks.filter((track) => {
    const names = [
      track.name,
      ...(track.ar ?? []).map((artist) => artist.name),
      track.al.name,
    ].map(toLower)

    return names.some((name) => name.includes(keyword.toLowerCase()))
  })
}
