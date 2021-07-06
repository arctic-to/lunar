import match from '@revincx/unblockneteasemusic'
import { SnapshotOut, types } from 'mobx-state-tree'

import { SongSnapshotIn } from '@/models'

export function matchUnofficialSong(
  song: SongSnapshotIn,
): Promise<UnofficialSongSourceSnapshot | undefined> {
  return match(song.id, ['qq', 'kuwo', 'migu'], {
    ...song,
    album: song.al,
    artists: song.ar,
  })
}

export type UnofficialSongSourceSnapshot = SnapshotOut<
  typeof UnofficialSongSource
>
export const UnofficialSongSource = types.model('UnofficialSongSource', {
  size: types.number,
  br: types.number,
  url: types.string,
})
