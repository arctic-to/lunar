import { observer } from 'mobx-react-lite'
import { RiVolumeDownLine } from 'react-icons/ri'

import { Slider } from '@/components'
import { usePlayer } from '@/models'

import styles from './VolumeSlider.module.scss'

export const VolumeSlider: React.VFC = observer(() => {
  const { track } = usePlayer()

  return (
    <div className={styles.container}>
      <RiVolumeDownLine />
      <Slider
        width={80}
        percentage={track.volume}
        onChange={track.setVolume}
        updateWhileMouseMove
      />
    </div>
  )
})

export default VolumeSlider
