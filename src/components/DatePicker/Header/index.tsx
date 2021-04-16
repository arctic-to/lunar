import {
  CgChevronDoubleLeft,
  CgChevronLeft,
  CgChevronDoubleRight,
  CgChevronRight,
} from 'react-icons/cg'

import styles from './Header.module.scss'

export type HeaderProps = {
  onChevronsLeftClick: () => void
  onChevronLeftClick?: () => void
  onChevronRightClick?: () => void
  onChevronsRightClick: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onChevronsLeftClick,
  onChevronLeftClick,
  onChevronRightClick,
  onChevronsRightClick,
  children,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <CgChevronDoubleLeft onClick={onChevronsLeftClick} />
        {onChevronLeftClick && <CgChevronLeft onClick={onChevronLeftClick} />}
      </div>

      <div className={styles.title}>{children}</div>

      <div className={styles.right}>
        {onChevronRightClick && (
          <CgChevronRight onClick={onChevronRightClick} />
        )}
        <CgChevronDoubleRight onClick={onChevronsRightClick} />
      </div>
    </div>
  )
}

export default Header
