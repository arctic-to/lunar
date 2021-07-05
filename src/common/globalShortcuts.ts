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

export const shortcutKeyMap = {
  [GlobalShortcut.Like]: [...MODIFIERS, 'L'],
  [GlobalShortcut.PlayPrev]: [...MODIFIERS, 'Left'],
  [GlobalShortcut.PlayNext]: [...MODIFIERS, 'Right'],
  [GlobalShortcut.TurnDownVolume]: [...MODIFIERS, 'Down'],
  [GlobalShortcut.TurnUpVolume]: [...MODIFIERS, 'Up'],
  [GlobalShortcut.Toggle]: [...MODIFIERS, 'P'],
  [GlobalShortcut.ToggleOsdLyric]: [...MODIFIERS, 'D'],
  [GlobalShortcut.ToggleOsdLyricTranslation]: [...MODIFIERS, 'T'],
  [GlobalShortcut.ToggleOsdLyricPhonetic]: [...MODIFIERS, 'Y'],
}

export const shortcutDescriptionMap = {
  [GlobalShortcut.Like]: 'Like',
  [GlobalShortcut.PlayPrev]: 'Play Previous Song',
  [GlobalShortcut.PlayNext]: 'Play Next Song',
  [GlobalShortcut.TurnDownVolume]: 'Turn down Volume',
  [GlobalShortcut.TurnUpVolume]: 'Turn up Volume',
  [GlobalShortcut.Toggle]: 'Play/Pause',
  [GlobalShortcut.ToggleOsdLyric]: 'Toggle OSD Lyric',
  [GlobalShortcut.ToggleOsdLyricTranslation]: 'Toggle OSD Lyric Translation',
  [GlobalShortcut.ToggleOsdLyricPhonetic]: 'Toggle OSD Lyric Phonetic',
}
