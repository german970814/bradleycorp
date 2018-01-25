import React from 'react'
import PropTypes from 'prop-types'
import SocialMediaIcon from '../../../Partials/SocialMediaIcon/SocialMediaIcon'
import style from '../Footer.scss'

const SocialMediaIcons = ({ tablet }) => {
  const includeIcons = [
    'facebook',
    'twitter',
    'instagram',
    'google',
    'pinterest',
    'youtube'
  ]

  if (!tablet) {
    // icons are displayed the same for mobile and desktop
    // but they stack into two rows on tablet
    return includeIcons.map(iconName => {
      return (
        <SocialMediaIcon
          key={iconName}
          iconName={iconName}
          className={style.socialMediaIcon} />
      )
    })
  }

  // on tablet we need to make sure the icons always stay in two rows
  const firstRowIcons = includeIcons.splice(0, Math.ceil(includeIcons.length / 2))
  return (
    <React.Fragment>

      <div>
        {
          firstRowIcons.map(iconName => {
            return (
              <SocialMediaIcon
                key={iconName}
                iconName={iconName}
                className={style.socialMediaIcon} />
            )
          })
        }
      </div>

      <div>
        {
          includeIcons.map(iconName => {
            return (
              <SocialMediaIcon
                key={iconName}
                iconName={iconName}
                className={style.socialMediaIcon} />
            )
          })
        }
      </div>

    </React.Fragment>
  )
}

SocialMediaIcons.propTypes = {
  tablet: PropTypes.bool
}

export default SocialMediaIcons
