import c from 'classnames'

import styles from './Button.module.scss'

export type ButtonProps = {
  Icon?: React.FC
  className?: string
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  Icon,
  className,
  onClick,
}) => {
  return (
    <button className={c(styles.container, className)} onClick={onClick}>
      {Icon && <Icon />}
      <span>{children}</span>
    </button>
  )
}

export default Button
