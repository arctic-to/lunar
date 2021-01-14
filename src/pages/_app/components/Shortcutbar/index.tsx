import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { RiHeart3Line, RiPlayListFill } from 'react-icons/ri'
import { VscHistory, VscSearch } from 'react-icons/vsc'

import { useView, ShortcutEnum } from '@/models'

import styles from './Shortcutbar.module.scss'

const Shortcuts = [
  {
    type: ShortcutEnum.Search,
    icon: VscSearch,
  },
  {
    type: ShortcutEnum.Playlists,
    icon: RiHeart3Line,
  },
  {
    type: ShortcutEnum.PlayQueue,
    icon: RiPlayListFill,
  },
  {
    type: ShortcutEnum.History,
    icon: VscHistory,
  },
]

export const Shortcutbar: React.VFC = observer(() => {
  const view = useView()

  const clickHandler = useCallback(
    (shortcutType: ShortcutEnum) => () => {
      view.switchShortcut(shortcutType)
    },
    [view],
  )

  return (
    <div className={styles.container}>
      {Shortcuts.map((Shortcut) => (
        <Shortcut.icon
          className={c({
            [styles.active]: view.findShortcut(Shortcut.type)?.active,
          })}
          key={Shortcut.type}
          onClick={clickHandler(Shortcut.type)}
        />
      ))}
    </div>
  )
})

export default Shortcutbar
