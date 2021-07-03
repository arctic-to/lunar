import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo, useState } from 'react'

import { Songlist } from '@/components'
import { PlaylistDetailResponseSnapshotOut, useSongDetail } from '@/data'

import styles from './Main.module.scss'

export type MainProps = {
  data: PlaylistDetailResponseSnapshotOut
}

export const Main: React.FC<MainProps> = observer(({ data }) => {
  const { tracks: initialTracks, trackIds } = data.playlist

  const restTrackIds = useMemo(
    () => trackIds.slice(initialTracks.length).map(({ id }) => id),
    [initialTracks.length, trackIds],
  )
  const [tracks, setTracks] = useState(initialTracks)
  const { data: restTracks } = useSongDetail(restTrackIds)

  useEffect(() => {
    setTracks([...initialTracks, ...restTracks])
  }, [initialTracks, restTracks])

  return (
    <div className={styles.container}>
      <Songlist songs={tracks} displayTags virtual />
    </div>
  )
})

export default Main
