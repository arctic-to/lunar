import { useRouter } from 'next/router'

export function usePlaylistId() {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  return Number(id)
}
