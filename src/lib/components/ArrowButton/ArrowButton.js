// @flow
import React from 'react'
import type { BCorpColor } from '../../types/styleguide_types'
import { Link } from 'react-router-dom'
import BCorpLink from '../BCorpLink/BCorpLink'
import SVGIcon from '../SVGIcon/SVGIcon'
import style from './ArrowButton.scss'

/*
 * STYLEGUIDE STYLES
 */

// NOTE SET FALSE IF NOT BUILDING STYLEGUIDE
//
// when building the styleguide
// ... @see https://github.com/styleguidist/react-styleguidist ...
// we need to include the global styles.
// Since we dont use the App.js component in the stylguide (where they're normally included)
// we include it here.
//
// We could probably find somewhere a bit more obvious to put this in the future.
//
//
// import '../../../scss/main.scss'
const styleguide = false
if (styleguide) {
  console.warn(
    'Importing main.scss twice, if you arent building the styleguide you need to remove this in ArrowButton.js'
  )
}

/*
 * ACTUAL COMPONENT STARTS HERE
 */

/**
 * Displays an element consisting of the SVG Arrow and some optional text. Option to add a link.
 */

type Props = {
  /**
    The text that will appear next to the arrow
   */
  text?: string,
  /**
    The target link on click. This can be internal or external
   */
  link?: string,
  /**
    The icon color (as a string referring to a color name from the styleguide)
   */
  color?: BCorpColor
}

const ArrowButton = (props: Props) => {
  const textDiv = props.text ? (
    <h6 className={style.text}>{props.text}</h6>
  ) : null

  const button = (
    <div className={`${style.arrowButton} arrow-button`}>
      {textDiv}
      <div className={style.arrowWrapper}>
        <SVGIcon
          className={style.arrow}
          icon={'arrow'}
          color={props.color}
          redrawOnHover
        />
      </div>
    </div>
  )

  if (props.link) {
    return (
      <BCorpLink
        url={props.link}
        renderInternal={url => {
          return <Link to={url}>{button}</Link>
        }}
        renderExternal={url => {
          return <a href={url}>{button}</a>
        }}
      />
    )
  } else {
    return button
  }
}

ArrowButton.defaultProps = {
  color: 'silver'
}

export default ArrowButton
