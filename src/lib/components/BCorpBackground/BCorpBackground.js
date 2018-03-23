import React from 'react'
import PropTypes from 'prop-types'
import { lookupColor } from '../../bcorpStyles'
import style from './BCorpBackground.scss'

/**
 * Adds a background to a parent div
 *
 * If src and overlay are passed, we return an image with a coloured overlay
 * If just src is passed, or overlay is an empty string, we get the image with opacity 1
 * If just the overlay is passed with no image, we get a solid coloured background
 * If neither are passed, we get the background colour from the skin
 *
 * NOTE: the parent div should extend the %bcorpBackgroundParent SCSS class.
 */
const BCorpBackground = props => {
  return (
    <div>

      <div
        style={{
          backgroundColor: getOverlay(props)
        }}
        className={style.overlay} />

      <div
        style={getBackgroundStyle(props)}
        className={`${style.image} bcorp-background-image`} />

    </div>
  )
}

function getBackgroundStyle (props) {
  const backgroundStyle = {}

  backgroundStyle.backgroundImage = props.imageSrc ? `url(${props.imageSrc})` : undefined
  backgroundStyle.opacity = props.overlay ? props.imageOpacity : 1

  return backgroundStyle
}

function getOverlay (props) {
  if (!props.overlay) {
    return props.skin === 'dark' ? lookupColor('black') : lookupColor('white')
  }
  return lookupColor(props.overlay)
}

BCorpBackground.propTypes = {
  imageSrc: PropTypes.string,
  overlay: PropTypes.string,
  skin: PropTypes.oneOf(['light', 'dark']).isRequired,
  imageOpacity: PropTypes.number
}

BCorpBackground.defaultProps = {
  skin: 'light',
  imageOpacity: 0.2
}

export default BCorpBackground
