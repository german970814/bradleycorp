import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import style from '../Footer.scss'

const FooterBottomSectionItem = props => {
  const lock = props.padlock
    ? (
      <img
        src={require('../../../../images/lock/lock@2x.png')}
        className={style.padlock} />
    ) : null

  return (
    <div
      className={'col1'} >
      <div
        className={`${style.menuItem} ${style.menuItemBottomSection}`} >
        {lock}
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
  title: PropTypes.string.isRequired,
  padlock: PropTypes.bool
}

export default FooterBottomSectionItem
