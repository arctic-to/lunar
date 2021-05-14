import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { VscSearch } from 'react-icons/vsc'

export type SearchInputProps = { className: string }

export const SearchInput: React.VFC<SearchInputProps> = ({ className }) => {
  const router = useRouter()
  const handleEnterDown = useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (e) => {
      if (e.code === 'Enter') {
        const keywords = e.currentTarget.value
        router.push(`search?keywords=${keywords}`)
      }
    },
    [router],
  )
  return (
    <span className={className}>
      <input placeholder="搜索" onKeyDown={handleEnterDown} />
      <VscSearch />
    </span>
  )
}

export default SearchInput
