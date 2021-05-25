export const path = {
  search(query: { keywords: string }) {
    return {
      pathname: '/search',
      query,
    }
  },
  artist(query: { id: number }) {
    return {
      pathname: '/artist/[id]',
      query,
    }
  },
}
