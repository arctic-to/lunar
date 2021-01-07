import { observer } from 'mobx-react-lite'

import { Slider } from '@/components'

import { useCurrentTrack } from '../../hooks'

export const ProgressSlider: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()

  return (
    <Slider
      width={400}
      height={12}
      percentage={currentTrack?.percentage}
      onChange={currentTrack?.setCurrentTime}
    />
  )
})

export default ProgressSlider
