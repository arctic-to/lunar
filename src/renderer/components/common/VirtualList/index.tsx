import { range } from 'lodash'
import { useLayoutEffect, useMemo, useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'

import { useScrollableAncestor } from '@/hooks'
import { calcDistanceToAncestor } from '@/utils'

import styles from './VirtualList.module.scss'
import { EMPTY_RANGE, intersect, Range } from './range'

// https://stackoverflow.com/a/51835761/13151903
export interface VirtualListProps extends React.HTMLAttributes<HTMLDivElement> {
  rowCount: number
  rowHeight: number
  children(index: number): React.ReactElement | null
}
export const VirtualList: React.FC<VirtualListProps> = ({
  rowCount,
  rowHeight,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState(EMPTY_RANGE)
  const distanceToScrollableAncestorRef = useRef<number>()
  const scrollableAncestor = useScrollableAncestor()

  const visibleIndexRange = useMemo<Range>(() => {
    const start = Math.floor(visibleRange.start / rowHeight)
    const end = Math.ceil(visibleRange.end / rowHeight)
    return intersect(new Range(start, end), new Range(0, rowCount))
  }, [rowCount, rowHeight, visibleRange.end, visibleRange.start])

  const update = useCallback(() => {
    if (!ref.current || !scrollableAncestor) return

    const { scrollTop, clientHeight: viewHeight } = scrollableAncestor

    const { clientHeight: listHeight } = ref.current
    const distanceToScrollableAncestor =
      distanceToScrollableAncestorRef.current ?? 0
    const viewRange = new Range(scrollTop, scrollTop + viewHeight)
    const listRange = new Range(
      distanceToScrollableAncestor,
      distanceToScrollableAncestor + listHeight,
    )
    setVisibleRange(
      intersect(viewRange, listRange).translate(-distanceToScrollableAncestor),
    )
  }, [scrollableAncestor])

  const handleScroll = useCallback(() => {
    update()
  }, [update])

  useLayoutEffect(() => {
    if (!ref.current || !scrollableAncestor) return

    scrollableAncestor.addEventListener('scroll', handleScroll)
    distanceToScrollableAncestorRef.current =
      distanceToScrollableAncestorRef.current ??
      calcDistanceToAncestor(ref.current, scrollableAncestor)
    update()
    return () => scrollableAncestor.removeEventListener('scroll', handleScroll)
  }, [handleScroll, update, rowCount, scrollableAncestor])

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{ height: rowCount * rowHeight }}
      {...props}
    >
      <div
        className={styles.content}
        style={{
          top: visibleIndexRange.start * rowHeight,
        }}
      >
        {range(visibleIndexRange.start, visibleIndexRange.end).map((i) =>
          children(i),
        )}
      </div>
    </div>
  )
}

export default VirtualList
