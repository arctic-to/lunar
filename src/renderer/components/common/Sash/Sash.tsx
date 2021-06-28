import { MouseEventHandler, useCallback, useEffect, useRef } from 'react'

import styles from './Sash.module.scss'

interface SashProps {
  pane1: HTMLDivElement | null
  pane2: HTMLDivElement | null
  min: [number, number]
  onMouseMove?: (pane1Width: number, pane2Width: number) => void
}

const SASH_WIDTH = 4
const HALF_WIDTH = SASH_WIDTH / 2

// The position of sash should always be calculated by the inflexiable pane.
const calcSashRight = (inflexiblePane: HTMLElement) => {
  const { left } = inflexiblePane.getBoundingClientRect()
  const { right } = inflexiblePane.parentElement!.getBoundingClientRect()
  return right - left - HALF_WIDTH
}

/**
 * Now we assume that the left pane is flexiable, and the right pane
 * is inflexiable, it might be more configurable in the future.
 */
export const Sash: React.VFC<SashProps> = ({
  pane1, // flexible pane
  pane2, // inflexible pane (has a fix width when window is resizing)
  min,
  onMouseMove,
}) => {
  const shouldRender = Boolean(pane1 && pane2)

  const sashRef = useRef<HTMLDivElement>(null)

  const startXRef = useRef<number>()
  const startWidth1Ref = useRef<number>()
  const startWidth2Ref = useRef<number>()

  useEffect(() => {
    if (sashRef.current && pane2 && shouldRender) {
      sashRef.current.style.right = `${calcSashRight(pane2)}px`
    }
  }, [pane2, shouldRender])

  const handleMouseMove = useCallback(
    ({ clientX }: MouseEvent) => {
      requestAnimationFrame(() => {
        if (
          startXRef.current &&
          sashRef.current &&
          startWidth1Ref.current &&
          startWidth2Ref.current &&
          pane1 &&
          pane2
        ) {
          const [pane1Min, pane2Min] = min
          const diffX = clientX - startXRef.current
          const endWidth1 = startWidth1Ref.current + diffX
          const endWidth2 = startWidth2Ref.current - diffX
          const containerWidth = endWidth1 + endWidth2
          let pane1Width = endWidth1
          let pane2Width = endWidth2

          if (endWidth1 < pane1Min) {
            pane1Width = pane1Min
            pane2Width = containerWidth - pane1Width
          }
          if (endWidth2 < pane2Min) {
            pane2Width = pane2Min
            pane1Width = containerWidth - pane2Width
          }

          const sashRight = calcSashRight(pane2)
          pane1.style.width = `${pane1Width}px`
          pane2.style.width = `${pane2Width}px`
          sashRef.current.style.right = `${sashRight}px`
          onMouseMove?.(pane1Width, pane2Width)
        }
      })
    },
    [min, onMouseMove, pane1, pane2],
  )

  const handleMouseUp = useCallback(() => {
    sashRef.current?.classList.remove(styles.hover)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseMove])

  const handleMouseDown = useCallback<MouseEventHandler>(
    (e) => {
      startXRef.current = e.clientX
      startWidth1Ref.current = pane1?.clientWidth
      startWidth2Ref.current = pane2?.clientWidth
      sashRef.current?.classList.add(styles.hover)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [handleMouseMove, handleMouseUp, pane1?.clientWidth, pane2?.clientWidth],
  )

  if (!shouldRender) return null

  return (
    <div
      className={styles.sash}
      ref={sashRef}
      onMouseDown={handleMouseDown}
      style={{ width: SASH_WIDTH }}
    />
  )
}
