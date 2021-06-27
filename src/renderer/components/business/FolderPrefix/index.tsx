import React from 'react'
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc'

import { Loader } from '@/components/common'

export type FolderPrefixProps = {
  folded: boolean
  loading: boolean
}

export const FolderPrefix: React.VFC<FolderPrefixProps> = ({
  folded,
  loading,
}) => {
  return (
    <>
      {folded ? <VscChevronRight /> : loading ? <Loader /> : <VscChevronDown />}
    </>
  )
}

export default FolderPrefix
