import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import { RiPlayListFill } from 'react-icons/ri'
import { VscHistory, VscRepo } from 'react-icons/vsc'

import { useView, ShortcutEnum } from '@/models'

import styles from './Shortcutbar.module.scss'

const Shortcuts = [
  {
    type: ShortcutEnum.Playlists,
    icon: VscRepo,
  },
  {
    type: ShortcutEnum.PlayQueue,
    icon: RiPlayListFill,
  },
  {
    type: ShortcutEnum.History,
    icon: VscHistory,
  },
  {
    type: ShortcutEnum.Daily,
    icon: IoCalendarOutline,
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
