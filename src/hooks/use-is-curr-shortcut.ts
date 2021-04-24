import { ShortcutEnum, useView } from '@/models'

export function useIsCurrShortcut(type: ShortcutEnum) {
  const view = useView()
  return view.currShortcut?.type === type
}
