import { useState } from 'react'

export function useBoolean(
  defaultValue: boolean,
): [state: boolean, setStateToTrue: () => void, setStateToFalse: () => void] {
  const [state, setState] = useState(defaultValue)
  const setStateToTrue = () => setState(true)
  const setStateToFalse = () => setState(false)

  return [state, setStateToTrue, setStateToFalse]
}
