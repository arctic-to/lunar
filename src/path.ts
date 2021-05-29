export const path = {
  search(query: { keywords: string }) {
    return {
      pathname: '/search',
      query,
    }
  },
  artist(id: number) {
    return {
      pathname: '/artist/[id]',
      query: { id },
    }
  },
  album(id: number) {
    return {
      pathname: '/album/[id]',
      query: { id },
    }
  },
  user(id: number) {
    return {
      pathname: '/u/[id]',
      query: { id },
    }
  },
  playlist(id: number) {
    return {
      pathname: '/playlist/[id]',
      query: { id },
    }
  },
  song: '/song',
}
