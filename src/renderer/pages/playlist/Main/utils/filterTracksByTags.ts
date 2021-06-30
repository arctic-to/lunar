import { SongSnapshotIn } from '@/models'
import { getMst, GlobalTagStore } from '@/stores'

const { songTagMap } = getMst(GlobalTagStore)

export default function filterTracksByTags(
  tracks: SongSnapshotIn[],
  selectedTagIds: number[],
) {
  if (!selectedTagIds.length) return tracks
  return tracks.filter((track) =>
    songTagMap
      .get(String(track.id))
      ?.some((tag) => selectedTagIds.includes(tag.id)),
  )
}
