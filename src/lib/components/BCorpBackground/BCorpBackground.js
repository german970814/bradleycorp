import React from 'react'
import PropTypes from 'prop-types'
import { lookupColor } from '../../bcorpStyles'
import style from './BCorpBackground.scss'

const BCorpBackground = props => {
  return (
    <div>

      <div
        style={{
          backgroundColor: getOverlay(props)
        }}
        className={style.overlay} />

      <div
        style={{
          backgroundImage: getBackgroundImage(props)
        }}
        className={style.image} />

    </div>
  )
}

function getBackgroundImage (props) {
  if (!props.imageSrc) {
    return undefined
  }
  return `url(${props.imageSrc})`
}

function getOverlay (props) {
  if (!props.overlay) {
    return props.skin === 'dark' ? lookupColor('black') : lookupColor('white')
  }
  return lookupColor(props.overlay)
}

BCorpBackground.propTypes = {
  src: PropTypes.string,
  overlay: PropTypes.string,
  skin: PropTypes.oneOf(['light', 'dark'])
}

BCorpBackground.defaultProps = {
  overlay: '',
  skin: 'light'
}

export default BCorpBackground
