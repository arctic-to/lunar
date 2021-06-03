/* [start, end) */
export interface Range {
  start: number
  end: number
}

export function intersect(one: Range, other: Range): Range {
  if (one.start >= other.end || other.start >= one.end) {
    return { start: 0, end: 0 }
  }

  const start = Math.max(one.start, other.start)
  const end = Math.min(one.end, other.end)

  if (end - start <= 0) {
    return { start: 0, end: 0 }
  }

  return { start, end }
}

export function isEmpty(range: Range): boolean {
  return range.end - range.start <= 0
}

export function intersects(one: Range, other: Range): boolean {
  return !isEmpty(intersect(one, other))
}

export function translate(range: Range, n: number) {
  return {
    start: range.start + n,
    end: range.end + n,
  }
}
