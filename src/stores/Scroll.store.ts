import { types } from 'mobx-state-tree'

export const ScrollStore = types
  .model('ScrollStore', {
    scrollTop: 0,
  })
  .actions((self) => ({
    setScrollTop(scrollTop: number) {
      self.scrollTop = scrollTop
    },
  }))
  .actions((self) => ({
    handleScroll(e: Event) {
      self.setScrollTop((e.currentTarget as HTMLDivElement).scrollTop)
    },
  }))
