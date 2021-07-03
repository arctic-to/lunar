import { useRouter } from 'next/router'

import NormalHeader from './NormalHeader'
import PlaylistHeader from './PlaylistHeader'

export const Header: React.FC = () => {
  const router = useRouter()
  const isPlaylist = router.pathname.startsWith('/playlist/')
  return isPlaylist ? <PlaylistHeader /> : <NormalHeader />
}

export default Header
