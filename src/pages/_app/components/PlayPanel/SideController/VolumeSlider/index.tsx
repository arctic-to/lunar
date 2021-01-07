import { observer } from 'mobx-react-lite'

import { Slider } from '@/components'

import { useCurrentTrack } from '../../hooks'

export const VolumeSlider: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()

  return (
    <Slider
      width={80}
      percentage={currentTrack?.volume}
      onChange={currentTrack?.setVolume}
    />
  )
})

export default VolumeSlider
