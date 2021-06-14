import { SongSnapshotIn } from '@/models'
import { PlaylistTagStoreInstance } from '@/stores'

export default function filterTracksByTags(
  tracks: SongSnapshotIn[],
  songTagMap: PlaylistTagStoreInstance['songTagMap'],
  selectedTagIds: number[],
) {
  if (!selectedTagIds.length) return tracks
  return tracks.filter((track) =>
    songTagMap.get(track.id)?.some((tag) => selectedTagIds.includes(tag.id)),
  )
}
