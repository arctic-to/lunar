import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo, useState } from 'react'

import { Songlist } from '@/components'
import { useSongDetail } from '@/data'
import { PlaylistDetailSnapshotOut } from '@/models'

import styles from './Main.module.scss'

export type MainProps = {
  playlist: PlaylistDetailSnapshotOut
}

export const Main: React.FC<MainProps> = observer(({ playlist }) => {
  const { tracks: initialTracks, trackIds } = playlist

  const restTrackIds = useMemo(
    () => trackIds.slice(initialTracks.length).map(({ id }) => id),
    [initialTracks.length, trackIds],
  )

  const [tracks, setTracks] = useState(initialTracks)
  const { data: restTracks } = useSongDetail(restTrackIds)

  useEffect(() => {
    // update `tracks` only when `restTracks` has updated
    if (restTracks.length === restTrackIds.length) {
      setTracks([...initialTracks, ...restTracks])
    }
  }, [initialTracks, restTrackIds.length, restTracks])

  return (
    <div className={styles.container}>
      <Songlist songs={tracks} displayTags virtual />
    </div>
  )
})

export default Main
