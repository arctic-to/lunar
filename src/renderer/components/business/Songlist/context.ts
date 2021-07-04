import { createContext } from 'react'

import { SongSnapshotIn } from '@/models'

interface SonglistContext {
  initialSongs: SongSnapshotIn[]
  // TODO: fix type
  setSongs(songs: any[]): void
}

export const SonglistContext = createContext<SonglistContext | null>(null)
