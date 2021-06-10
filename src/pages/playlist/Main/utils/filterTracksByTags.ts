import { NeteaseCloudMusicTag } from '@prisma/client'

import { SongSnapshotIn } from '@/models'

export default function filterTracksByTags(
  tracks: SongSnapshotIn[],
  tags: NeteaseCloudMusicTag[][],
  selectedTagIds: number[],
) {
  if (!selectedTagIds.length) return tracks
  return tracks.filter((track, index) =>
    tags[index].some((tag) => selectedTagIds.includes(tag.id)),
  )
}
