export const mod = (n: number, m: number) => ((n % m) + m) % m

export function correctPercentage(_percentage: number) {
  return Math.max(0, Math.min(1, _percentage))
}
