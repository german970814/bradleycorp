import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BCorpLink from '../BCorpLink/BCorpLink'
import SVGIcon from '../SVGIcon/SVGIcon'
import style from './ArrowButton.scss'

// NOTE SET FALSE IF NOT BUILDING STYLEGUIDE
import '../../../scss/main.scss'
const styleguide = true
if (styleguide) {
  console.warn(
    'Importing main.scss twice, if you arent building the styleguide you need to remove this in ArrowButton.js'
  )
}

/**
 * Displays an element consisting of the SVG Arrow and some optional text. Option to add a link.
 */
const ArrowButton = props => {
  const textDiv = props.text ? (
    <h6 className={style.text}>{props.text}</h6>
  ) : null

  const button = (
    <div className={style.arrowButton}>
      {textDiv}
      <div className={style.arrowWrapper}>
        <SVGIcon
          className={style.arrow}
          icon={'arrow'}
          color={'silver'}
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
          return (
            <Link to={url} replace>
              {button}
            </Link>
          )
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

ArrowButton.propTypes = {
  /**
    The text that will appear next to the arrow
   */
  text: PropTypes.string,
  /**
    The target link on click. This can be internal or external
   */
  link: PropTypes.string
}

export default ArrowButton
