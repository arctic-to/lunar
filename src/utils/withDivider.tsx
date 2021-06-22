import { ReactNode } from 'react'

export function withDivider(
  elements: ReactNode[] | undefined,
  divider: ReactNode,
) {
  return elements?.reduce((acc, cur) => (
    <>
      {acc} {divider} {cur}
    </>
  ))
}
