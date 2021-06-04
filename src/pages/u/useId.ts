import { useRouter } from 'next/router'

export function useId() {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  return id
}
