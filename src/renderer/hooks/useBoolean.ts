import { useState } from 'react'

export function useBoolean(defaultValue: boolean) {
  const [state, setState] = useState(defaultValue)
  const setStateToTrue = () => setState(true)
  const setStateToFalse = () => setState(false)
  const toggle = () => setState((prev) => !prev)

  return [state, setStateToTrue, setStateToFalse, toggle] as const
}
