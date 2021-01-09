import { useCallback, useRef } from 'react'

import styles from './Slider.module.scss'

export type SliderProps = {
  width?: number
  height?: number
  percentage?: number
  onChange?: (percentage: number) => void
}

export const Slider: React.VFC<SliderProps> = ({
  width = 100,
  height = 10,
  percentage = 0,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (!ref.current) return
      const sliderX = ref.current.getBoundingClientRect().left
      const clickedX = e.clientX
      const diffX = clickedX - sliderX
      const percentage = Math.min(diffX / width, 1)
      onChange?.(percentage)
    },
    [width, onChange],
  )

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleChange)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleChange])

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', handleChange)
    document.addEventListener('mouseup', handleMouseUp)
  }, [handleChange, handleMouseUp])

  return (
    <div
      className={styles.track}
      style={{ width, height }}
      ref={ref}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.fill} style={{ width: `${percentage * 100}%` }}>
        <div className={styles.slider} />
      </div>
    </div>
  )
}

export default Slider
