import { NeteaseCloudMusicTag } from '@prisma/client'

import { SongSnapshotIn } from '@/models'

export default function filterTracksByTags(
  tracks: SongSnapshotIn[],
  songTagMap: Map<number, NeteaseCloudMusicTag[]>,
  selectedTagIds: number[],
) {
  if (!selectedTagIds.length) return tracks
  return tracks.filter((track) =>
    songTagMap.get(track.id)?.some((tag) => selectedTagIds.includes(tag.id)),
  )
}
