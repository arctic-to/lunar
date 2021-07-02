import Store from 'electron-store'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useToggle } from 'react-use'

import { OrderEnum, TrackSongSnapshot } from '@/models'
import { isDev } from '@/utils'

interface LyricState {
  overlay: boolean
  phonetic: boolean
  translation: boolean
}

const store = new Store<LyricState>({
  name: isDev ? 'lyric_state.dev' : 'lyric_state',
  defaults: {
    overlay: false,
    translation: true,
    phonetic: false,
  },
})

export const LyricStoreContext = createContext<ReturnType<
  typeof useCreateLyricStore
> | null>(null)

function useLyricDependency() {
  const [song, setSong] = useState<TrackSongSnapshot>()
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>()
  const [order, setOrder] = useState<OrderEnum>()
  return {
    song,
    order,
    currentTime,
    playing,
    setSong,
    setOrder,
    setCurrentTime,
    setPlaying,
  }
}

function useLyricState() {
  const [overlay, toggleOverlay] = useToggle(store.get('overlay'))
  const [phonetic, togglePhonetic] = useToggle(store.get('phonetic'))
  const [translation, toggleTranslation] = useToggle(store.get('translation'))

  const LyricState = useMemo(
    () => ({
      overlay,
      phonetic,
      translation,
    }),
    [overlay, phonetic, translation],
  )

  useEffect(() => {
    store.store = LyricState
  }, [LyricState])

  return {
    ...LyricState,
    toggleOverlay,
    togglePhonetic,
    toggleTranslation,
  }
}

export function useCreateLyricStore() {
  return {
    ...useLyricDependency(),
    ...useLyricState(),
  }
}

export function useLyricStore() {
  const store = useContext(LyricStoreContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}

export type LyricStore = ReturnType<typeof useLyricStore>
