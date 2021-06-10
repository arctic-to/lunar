import c from 'classnames'
import { forwardRef, PropsWithChildren } from 'react'

import styles from './Button.module.scss'

export type ButtonProps = {
  Icon?: React.FC
  disabled?: boolean
  className?: string
  onClick: () => void
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({ children, Icon, disabled = false, className, onClick }, ref) => {
  return (
    <button
      className={c(styles.container, className)}
      disabled={disabled}
      onClick={onClick}
      ref={ref}
    >
      {Icon && <Icon />}
      {children && <span>{children}</span>}
    </button>
  )
})

export default Button
