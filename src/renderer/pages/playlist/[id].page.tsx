import { observer } from 'mobx-react-lite'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { playlistMap } from '@/cache'
import { usePlaylistDetail } from '@/data'
import { getMst } from '@/stores'
import { getScrollableAncestor } from '@/utils'

import Header from './Header'
import Main from './Main'
import { useId } from './hooks'
import styles from './playlist.module.scss'
import { PlaylistStore } from './playlist.store'

export const Playlist: React.FC = () => {
  const id = useId()
  const [node, setNode] = useState<HTMLDivElement | null>(null)
  const scrollableAncestor = useMemo(() => getScrollableAncestor(node), [node])

  const { scrollTop, handleScroll } = getMst(PlaylistStore, {
    scope: id,
  })

  const { data } = usePlaylistDetail(id)
  const playlist = useMemo(() => {
    const _playlist = data?.playlist
    const cache = playlistMap.get(id)
    return _playlist || cache
  }, [data?.playlist, id])

  // TODO: Remove scroll restoration logic after Next.js fix it
  // https://github.com/vercel/next.js/issues/20951#issuecomment-758785612
  useLayoutEffect(() => {
    if (!scrollableAncestor) return
    scrollableAncestor.scrollTop = scrollTop
    return () => {
      scrollableAncestor.scrollTop = 0
    }
    // Update scrollTop only after the page has been mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollableAncestor])

  useEffect(() => {
    if (!scrollableAncestor) return
    scrollableAncestor.addEventListener('scroll', handleScroll)
    return () => scrollableAncestor.removeEventListener('scroll', handleScroll)
  }, [handleScroll, scrollableAncestor])

  if (!playlist) return null

  return (
    <div className={styles.container} ref={setNode}>
      <Header playlist={playlist} />
      <Main playlist={playlist} />
    </div>
  )
}

export default observer(Playlist)
