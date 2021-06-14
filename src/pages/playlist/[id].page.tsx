import { observer } from 'mobx-react-lite'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { usePlaylistDetail } from '@/data'
import { getMst } from '@/stores'

import Header from './Header'
import Main from './Main'
import { useId } from './hooks'
import styles from './playlist.module.scss'
import { PlaylistStore } from './playlist.store'

export const Playlist: React.FC = () => {
  const id = useId()
  const [node, setNode] = useState<HTMLDivElement | null>(null)
  const scrollableElement = useMemo(() => node?.parentElement, [node])

  const { scrollTop, handleScroll } = getMst(PlaylistStore, {
    scope: id,
  })

  const { data } = usePlaylistDetail(id)

  // TODO: Remove scroll restoration logic after Next.js fix it
  // https://github.com/vercel/next.js/issues/20951#issuecomment-758785612
  useLayoutEffect(() => {
    if (scrollableElement) scrollableElement.scrollTop = scrollTop
    // Update scrollTop only after the page has been mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollableElement])

  useEffect(() => {
    scrollableElement?.addEventListener('scroll', handleScroll)
    return () => scrollableElement?.removeEventListener('scroll', handleScroll)
  }, [handleScroll, scrollableElement])

  if (!data) return null

  return (
    <div className={styles.container} ref={setNode}>
      <Header data={data} />
      <Main data={data} />
    </div>
  )
}

export default observer(Playlist)
