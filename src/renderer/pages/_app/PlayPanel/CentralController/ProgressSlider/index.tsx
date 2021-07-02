import { observer } from 'mobx-react-lite'

import { Slider } from '@/components'
import { usePlayer } from '@/models'

export const ProgressSlider: React.VFC = observer(() => {
  const { percentage, setCurrentTimeByPercentage } = usePlayer().track

  return (
    <Slider
      width={460}
      height={12}
      percentage={percentage}
      onChange={setCurrentTimeByPercentage}
    />
  )
})

export default ProgressSlider
