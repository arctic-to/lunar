import c from 'classnames'
import { VscSearch } from 'react-icons/vsc'

import styles from './SearchInput.module.scss'

export type SearchInputProps = {
  className: string
  value?: string
  defaultValue?: string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const SearchInput: React.VFC<SearchInputProps> = ({
  className,
  ...inputProps
}) => {
  return (
    <span className={c(styles.container, className)}>
      <input placeholder="搜索" {...inputProps} />
      <VscSearch />
    </span>
  )
}

export default SearchInput
