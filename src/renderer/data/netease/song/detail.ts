import _axios from 'axios'
import { chunk } from 'lodash'
import { SnapshotOut, types } from 'mobx-state-tree'
import { useEffect, useRef, useState } from 'react'

import { getCachedSongs, setPrivilegeMap, setSongMap } from '@/cache'
import { SongSnapshotOut } from '@/models'
import { Privilege, Track } from '@/models/Platform/Netease'

import { axios } from '../fetcher'

const CHUNK_SIZE = 500

export function useSongDetail(songIds: number[] | undefined) {
  const cancelSourceRef = useRef(_axios.CancelToken.source())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      // cancel previous requests and update token
      cancelSourceRef.current.cancel()
      cancelSourceRef.current = _axios.CancelToken.source()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songIds])

  const [data, setData] = useState<SongSnapshotOut[]>([])

  useEffect(() => {
    if (songIds) {
      setData(getCachedSongs(songIds))
    }
  }, [songIds])

  const idStr = songIds?.join()
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!songIds) return
    data.sort((song1, song2) => {
      const song1Index = songIds.findIndex((id) => id === song1.id)
      const song2Index = songIds.findIndex((id) => id === song2.id)
      return song1Index - song2Index
    })
  }, [data, songIds])

  useEffect(() => {
    if (!idStr) {
      setIsLoaded(true)
      return
    }

    const ids = idStr.split(',')
    const idChunks = chunk(ids, CHUNK_SIZE)
    let _data: SongSnapshotOut[] = []

    setLoading(true)
    const promises = idChunks.map((idChunk) => {
      return axios
        .post<SongDetailResponseSnapshot>(
          `/song/detail?timestamp=${Date.now()}`,
          { ids: idChunk.join() },
          { withCredentials: true, cancelToken: cancelSourceRef.current.token },
        )
        .then(({ data }) => {
          _data = [..._data, ...data.songs]
          setSongMap(data.songs)
          setPrivilegeMap(data.songs, data.privileges)
        })
    })

    Promise.all(promises)
      .then(() => {
        setData(_data)
        setLoading(false)
        setIsLoaded(true)
      })
      .catch((err) => {
        setError(err)
      })
  }, [idStr])

  return {
    isLoaded,
    data,
    error,
  }
}

type SongDetailResponseSnapshot = SnapshotOut<typeof SongDetailResponse>
const SongDetailResponse = types.model('SongDetailResponse', {
  code: types.number,
  songs: types.array(Track),
  privileges: types.array(Privilege),
})
