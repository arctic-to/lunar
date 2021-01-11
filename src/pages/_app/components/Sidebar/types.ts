import { isValidElement } from 'react'

export interface Pane extends React.VFC {
  title?: string
}

export type SidebarComponentWithoutPanes = React.VFC & {
  name: string
}

export type SidebarComponentWithPanes = {
  name: string
  Panes: Pane[]
}

export type SidebarComponent =
  | SidebarComponentWithoutPanes
  | SidebarComponentWithPanes

export function isSidebarComponentWithPanes(
  component: SidebarComponent,
): component is SidebarComponentWithPanes {
  return !isValidElement(component)
}
