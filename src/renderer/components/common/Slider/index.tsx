import { useCallback, useEffect, useRef, useState } from 'react'

import { correctPercentage } from '@/utils'

import styles from './Slider.module.scss'

export type SliderProps = {
  width?: number
  height?: number
  percentage?: number
  onChange?: (percentage: number) => void
  updateWhileMouseMove?: boolean
}

export const Slider: React.VFC<SliderProps> = ({
  width = 100,
  height = 10,
  percentage = 0,
  onChange,
  updateWhileMouseMove = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseMove, setIsMouseMove] = useState(false)
  const [_percentage, setInnerPercentage] = useState(percentage)

  useEffect(() => {
    if (!isMouseMove) {
      setInnerPercentage(percentage)
    }
  }, [isMouseMove, percentage])

  const updateInnerPercentage = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (!ref.current) return 0

      const sliderX = ref.current.getBoundingClientRect().left
      const clickedX = e.clientX
      const diffX = clickedX - sliderX
      const newPercentage = correctPercentage(diffX / width)
      setInnerPercentage(newPercentage)

      return newPercentage
    },
    [width],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const newPercentage = updateInnerPercentage(e)
      if (updateWhileMouseMove) {
        onChange?.(newPercentage)
      }
    },
    [onChange, updateInnerPercentage, updateWhileMouseMove],
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      setIsMouseMove(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      onChange?.(updateInnerPercentage(e))
    },
    [handleMouseMove, onChange, updateInnerPercentage],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setIsMouseMove(true)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [handleMouseMove, handleMouseUp],
  )

  const handleTrackMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onChange?.(updateInnerPercentage(e))
    },
    [onChange, updateInnerPercentage],
  )

  return (
    <div
      className={styles.track}
      style={{ width, height }}
      ref={ref}
      onMouseDown={handleTrackMouseDown}
    >
      <div className={styles.fill} style={{ width: `${_percentage * 100}%` }}>
        <div className={styles.slider} onMouseDown={handleMouseDown} />
      </div>
    </div>
  )
}

export default Slider
