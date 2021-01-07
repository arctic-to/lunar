import { RiVolumeDownLine, RiPlayListFill } from 'react-icons/ri'

import VolumeSlider from './VolumeSlider'

export const SideController: React.VFC = () => {
  return (
    <div>
      <RiVolumeDownLine />
      <VolumeSlider />
      <RiPlayListFill />
    </div>
  )
}

export default SideController
