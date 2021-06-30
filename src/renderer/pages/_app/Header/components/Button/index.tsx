import c from 'classnames'

import styles from './Button.module.scss'

export type ButtonProps = {
  onClick?: () => void
  className?: string
}
export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button className={c(className, styles.button)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
