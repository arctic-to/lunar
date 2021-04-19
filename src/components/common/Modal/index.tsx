import { useRef } from 'react'
import { useClickAway } from 'react-use'

import styles from './Modal.module.scss'

export type ModalProps = {
  opened: boolean
  close: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, opened, close }) => {
  const ref = useRef(null)
  useClickAway(ref, close)

  if (!opened) return null

  return (
    <div ref={ref} className={styles.modal}>
      {children}
    </div>
  )
}
