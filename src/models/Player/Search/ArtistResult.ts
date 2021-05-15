import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { ArtistResult as NeteaseArtistResult } from '../../Platform/Netease'

export const ArtistResult = NeteaseArtistResult
export type ArtistResultSnapshotIn = SnapshotIn<typeof ArtistResult>
export type ArtistResultSnapshotOut = SnapshotOut<typeof ArtistResult>
