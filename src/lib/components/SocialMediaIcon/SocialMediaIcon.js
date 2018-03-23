import React from 'react'
import PropTypes from 'prop-types'
import style from './SocialMediaIcon.scss'

const SocialMediaIcon = ({ className, iconName }) => {
  const iconSrc = getIconSrc(iconName)

  if (!iconSrc) {
    return null
  }

  return (
    <div
      className={`social-media-icon ${style.socialMediaIcon} ${className}`} >
      <img
        src={iconSrc} />
    </div>
  )
}

SocialMediaIcon.propTypes = {
  // select icon name from the list below
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string
}

const getIconSrc = iconName => {
  switch (iconName) {
    case 'facebook':
      return require('../../../images/social-media-icons/facebook@2x.png')

    case 'google':
      return require('../../../images/social-media-icons/google@2x.png')

    case 'instagram':
      return require('../../../images/social-media-icons/instagram@2x.png')

    case 'pinterest':
      return require('../../../images/social-media-icons/pinterest@2x.png')

    case 'twitter':
      return require('../../../images/social-media-icons/twitter@2x.png')

    case 'youtube':
      return require('../../../images/social-media-icons/you-tube@2x.png')

    default:
      return false
  }
}

export default SocialMediaIcon
