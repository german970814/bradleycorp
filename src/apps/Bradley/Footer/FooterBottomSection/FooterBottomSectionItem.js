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
        {!props.link.startsWith('http') ? <Link
          to={props.link}
          replace >
          <div className={`small-link-gray ${style.menuItemLinkGray}`} >{props.title}</div>
        </Link>
          : <a href={props.link}>
            <div className={`small-link-gray ${style.menuItemLinkGray}`} >{props.title}</div>
          </a>
        }
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
