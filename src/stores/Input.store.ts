import { types } from 'mobx-state-tree'

export const InputStore = types
  .model({
    keyword: '',
  })
  .actions((self) => ({
    setKeyword(keyword: string) {
      self.keyword = keyword
    },
  }))
  .actions((self) => ({
    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      self.setKeyword(e.currentTarget.value)
    },
  }))
