export class Range {
  start: number
  end: number
  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }

  translate(n: number) {
    return new Range(this.start + n, this.end + n)
  }
}

export const EMPTY_RANGE = new Range(0, 0)

export function intersect(one: Range, other: Range): Range {
  if (one.start >= other.end || other.start >= one.end) {
    return EMPTY_RANGE
  }

  const start = Math.max(one.start, other.start)
  const end = Math.min(one.end, other.end)

  if (end - start < 0) {
    return EMPTY_RANGE
  }

  return new Range(start, end)
}
