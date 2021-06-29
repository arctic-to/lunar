export enum GlobalShortcut {
  Like,
  PlayPrev,
  PlayNext,
  TurnDownVolume,
  TurnUpVolume,
  Toggle,
  ToggleOsdLyric,
  ToggleOsdLyricTranslation,
  ToggleOsdLyricPhonetic,
}

const MODIFIERS = ['CommandOrControl', 'Alt']

function getAccelerator(...keys: string[]) {
  return keys.join('+')
}

export const acceleratorMap = {
  [GlobalShortcut.Like]: getAccelerator(...MODIFIERS, 'L'),
  [GlobalShortcut.PlayPrev]: getAccelerator(...MODIFIERS, 'Left'),
  [GlobalShortcut.PlayNext]: getAccelerator(...MODIFIERS, 'Right'),
  [GlobalShortcut.TurnDownVolume]: getAccelerator(...MODIFIERS, 'Down'),
  [GlobalShortcut.TurnUpVolume]: getAccelerator(...MODIFIERS, 'Up'),
  [GlobalShortcut.Toggle]: getAccelerator(...MODIFIERS, 'P'),
  [GlobalShortcut.ToggleOsdLyric]: getAccelerator(...MODIFIERS, 'D'),
  [GlobalShortcut.ToggleOsdLyricTranslation]: getAccelerator(...MODIFIERS, 'T'),
  [GlobalShortcut.ToggleOsdLyricPhonetic]: getAccelerator(...MODIFIERS, 'Y'),
}
