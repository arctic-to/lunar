import React, { useMemo } from 'react'

import { Songlist } from '@/components'
import { RecordType, useUserRecord } from '@/data'
import styles from '@/style/business/page.module.scss'

import { useId } from '../useId'

export const Recent: React.FC = () => {
  const id = useId()
  const { data } = useUserRecord(id, RecordType.Week)

  const songs = useMemo(
    () => data?.weekData.map((record) => record.song).slice(0, 3),
    [data?.weekData],
  )

  if (!songs) return null

  return (
    <div>
      <div className={styles.subtitle}>最近在听</div>
      <div>
        <Songlist songs={songs} hideHeader hideListHeader />
      </div>
    </div>
  )
}

export default Recent
