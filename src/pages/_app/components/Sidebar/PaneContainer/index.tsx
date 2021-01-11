import { observer } from 'mobx-react-lite'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { useToggle } from 'react-use'

import { Pane } from '../types'

import styles from './PaneContainer.module.scss'

interface PaneProps {
  Pane: Pane
}

export const PaneContainer: React.VFC<PaneProps> = observer(({ Pane }) => {
  const [folded, toggle] = useToggle(false)

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggle}>
        {folded ? <VscChevronRight /> : <VscChevronDown />}
        {Pane.title}
      </div>
      <Pane />
    </div>
  )
})

export default PaneContainer
