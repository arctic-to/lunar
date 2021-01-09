import { observer } from 'mobx-react-lite'
import { RiVolumeDownLine } from 'react-icons/ri'

import { Slider } from '@/components'

import { useCurrentTrack } from '../../hooks'

import styles from './VolumeSlider.module.scss'

export const VolumeSlider: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()

  return (
    <div className={styles.container}>
      <RiVolumeDownLine />
      <Slider
        width={80}
        percentage={currentTrack?.volume}
        onChange={currentTrack?.setVolume}
      />
    </div>
  )
})

export default VolumeSlider
