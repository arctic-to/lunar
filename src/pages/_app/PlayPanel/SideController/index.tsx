import style from './SideController.module.scss'
import VolumeSlider from './VolumeSlider'

export const SideController: React.VFC = () => {
  return (
    <div className={style.container}>
      <VolumeSlider />
    </div>
  )
}

export default SideController
