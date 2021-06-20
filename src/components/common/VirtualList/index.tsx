import { range } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'

import styles from './VirtualList.module.scss'
import { EMPTY_RANGE, intersect, Range } from './range'
import { calcDistanceToAncestor, getScrollableParent } from './utils'

export type VirtualListProps = {
  rowCount: number
  rowHeight: number
  children(index: number): React.ReactElement
}
export const VirtualList: React.FC<VirtualListProps> = ({
  rowCount,
  rowHeight,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState(EMPTY_RANGE)
  const distanceToScrollableAncestorRef = useRef<number>()

  const visibleIndexRange = useMemo<Range>(() => {
    const start = Math.floor(visibleRange.start / rowHeight)
    const end = Math.ceil(visibleRange.end / rowHeight)
    return intersect(new Range(start, end), new Range(0, rowCount))
  }, [rowCount, rowHeight, visibleRange.end, visibleRange.start])

  const update = useCallback((scrollableAncestor: HTMLElement) => {
    const { scrollTop, clientHeight: viewHeight } = scrollableAncestor

    const { clientHeight: listHeight } = ref.current!
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
  }, [])

  const handleScroll = useCallback(
    (e: Event) => {
      update(e.currentTarget as HTMLDivElement)
    },
    [update],
  )

  useEffect(() => {
    if (!ref.current) return
    const scrollableAncestor = getScrollableParent(ref.current)
    if (!scrollableAncestor) return

    scrollableAncestor.addEventListener('scroll', handleScroll)
    distanceToScrollableAncestorRef.current =
      distanceToScrollableAncestorRef.current ??
      calcDistanceToAncestor(ref.current, scrollableAncestor)
    update(scrollableAncestor)
    return () => scrollableAncestor.removeEventListener('scroll', handleScroll)
  }, [handleScroll, update, rowCount])

  return (
    <div
      className={styles.container}
      ref={ref}
      style={{ height: rowCount * rowHeight }}
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
