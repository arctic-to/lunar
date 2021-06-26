import { useRouter } from 'next/router'

export default function useId() {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  return Number(id)
}
