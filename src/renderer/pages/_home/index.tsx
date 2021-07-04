import React from 'react'

import {
  GlobalShortcut,
  shortcutDescriptionMap,
  shortcutKeyMap,
} from '@/../common'
import { withDivider } from '@/utils'

import styles from './Home.module.scss'

function makeReadableKey(key: string) {
  switch (key) {
    case 'CommandOrControl': {
      return 'Ctrl'
    }
    default: {
      return key
    }
  }
}

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.shortcuts}>
        {Object.entries(shortcutKeyMap).map(([shortcut, keys]) => (
          <div className={styles.shortcut}>
            <span className={styles.desc}>
              {shortcutDescriptionMap[shortcut as unknown as GlobalShortcut]}
            </span>
            <span className={styles.keys}>
              {withDivider(
                keys.map((key) => (
                  <span className={styles.key}>{makeReadableKey(key)}</span>
                )),
                '+',
              )}
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}
