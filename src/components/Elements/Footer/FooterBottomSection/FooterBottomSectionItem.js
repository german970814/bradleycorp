import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import style from '../Footer.scss'

const FooterBottomSectionItem = props => {
  return (
    <div
      className={'col1'} >
      <div
        className={`${style.menuItem} ${style.menuItemBottomSection}`} >
        <Link
          to={props.link}
          replace >
          {props.title}
        </Link>
      </div>
    </div>
  )
}

FooterBottomSectionItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default FooterBottomSectionItem
