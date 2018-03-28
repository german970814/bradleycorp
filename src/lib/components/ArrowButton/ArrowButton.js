import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BCorpLink from '../BCorpLink/BCorpLink'
import SVGIcon from '../SVGIcon/SVGIcon'
import style from './ArrowButton.scss'

const ArrowButton = ({ text, link }) => {
  const textDiv = text ? <h6 className={style.text} >{text}</h6> : null

  const button = (
    <div className={style.arrowButton} >
      {textDiv}
      <div className={style.arrowWrapper} >
        <SVGIcon
          className={style.arrow}
          icon={'arrow'}
          color={'silver'}
          redrawOnHover />
      </div>
    </div>
  )

  return link
    ? <BCorpLink
      url={link}
      renderInternal={url => {
        return (
          <Link to={url} replace >
            {button}
          </Link>
        )
      }}
      renderExternal={url => {
        return (
          <a href={url} >
            {button}
          </a>
        )
      }} />
    : button
}

ArrowButton.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
}

export default ArrowButton
