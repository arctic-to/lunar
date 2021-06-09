import c from 'classnames'

import styles from './Button.module.scss'

export type ButtonProps = {
  Icon?: React.FC
  disabled?: boolean
  className?: string
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  Icon,
  disabled = false,
  className,
  onClick,
}) => {
  return (
    <button
      className={c(styles.container, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {children && <span>{children}</span>}
    </button>
  )
}

export default Button
