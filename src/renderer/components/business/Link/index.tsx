import c from 'classnames'
import { LinkProps } from 'next/dist/client/link'
import NextLink from 'next/link'
import React from 'react'

import styles from './Link.module.scss'

export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  if (!React.isValidElement(children)) return null

  return (
    <NextLink {...props}>
      {React.cloneElement(children, {
        className: c(children.props.className, styles.click_area),
      })}
    </NextLink>
  )
}

export default Link
