import { observer } from 'mobx-react-lite'

import { Slider } from '@/components'
import { useCurrentTrack } from '@/models'

export const ProgressSlider: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()

  return (
    <Slider
      width={460}
      height={12}
      percentage={currentTrack?.percentage}
      onChange={currentTrack?.setCurrentTimeByPercentage}
    />
  )
})

export default ProgressSlider
