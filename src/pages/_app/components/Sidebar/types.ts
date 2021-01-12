export interface Pane extends React.VFC {
  title?: string
}

export type SidebarComponentWithoutPanes = React.VFC & {
  title?: string
}

export type SidebarComponentWithPanes = {
  title: string
  Panes: Pane[]
}

export type SidebarComponent =
  | SidebarComponentWithoutPanes
  | SidebarComponentWithPanes

export function isSidebarComponentWithPanes(
  component: SidebarComponent,
): component is SidebarComponentWithPanes {
  return 'Panes' in component
}
