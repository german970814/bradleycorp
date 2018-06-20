import React from 'react'
import PropTypes from 'prop-types'
import style from './SocialMediaIcon.scss'

/**
 * Renders one of the included social media icons
 */
const SocialMediaIcon = ({ className, iconName }) => {
  const { src, href } = getIconConf(iconName)

  if (!src) {
    return null
  }

  return (
    <div className={`social-media-icon ${style.socialMediaIcon} ${className}`}>
      <a href={href} target="_blank">
        <img src={src} />
      </a>
    </div>
  )
}

SocialMediaIcon.propTypes = {
  iconName: PropTypes.oneOf([
    'facebook',
    'google',
    'linkedin',
    'pinterest',
    'twitter',
    'youtube'
  ]).isRequired,
  className: PropTypes.string
}

const getIconConf = iconName => {
  switch (iconName) {
    case 'facebook':
      return {
        src: require('../../../images/social-media-icons/facebook@2x.png'),
        href: 'https://www.facebook.com/BradleyCorporation'
      }

    case 'google':
      return {
        src: require('../../../images/social-media-icons/google@2x.png'),
        href: 'https://plus.google.com/+Bradleycorp'
      }

    case 'linkedin':
      return {
        src: require('../../../images/social-media-icons/linkedin@2x.png'),
        href: 'https://www.linkedin.com/company/bradley-corporation/'
      }

    case 'pinterest':
      return {
        src: require('../../../images/social-media-icons/pinterest@2x.png'),
        href: 'https://www.pinterest.com/bradleycorp/'
      }

    case 'twitter':
      return {
        src: require('../../../images/social-media-icons/twitter@2x.png'),
        href: 'https://twitter.com/bradleycorp'
      }

    case 'youtube':
      return {
        src: require('../../../images/social-media-icons/you-tube@2x.png'),
        href: 'https://www.youtube.com/user/BradleyCorporation'
      }

    default:
      return false
  }
}

export default SocialMediaIcon
