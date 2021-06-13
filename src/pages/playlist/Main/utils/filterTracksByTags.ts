import { SongSnapshotIn } from '@/models'
import { TagStoreInstance } from '@/stores'

export default function filterTracksByTags(
  tracks: SongSnapshotIn[],
  songTagMap: TagStoreInstance['songTagMap'],
  selectedTagIds: number[],
) {
  if (!selectedTagIds.length) return tracks
  return tracks.filter((track) =>
    songTagMap
      .get(String(track.id))
      ?.some((tag) => selectedTagIds.includes(tag.id)),
  )
}
