// @flow
import * as React from 'react'
import type { BCorpColor, BCorpSkin } from '../../types/styleguide_types'
import { lookupColor } from '../../bcorpStyles'
import style from './BCorpBackground.scss'

export const darkSkinColour = lookupColor('charcoal-grey')

/**
 * Adds a background to a parent div with some logic for combining images, overlays, and skin
 *
 *
 * If src and overlay are passed, we return an image with a coloured overlay.
 *
 * If just src is passed, or overlay is an empty string, we get the image with opacity 1.
 *
 * If just the overlay is passed with no image, we get a solid coloured background.
 *
 * If neither are passed, we get the background colour from the skin.
 *
 *
 * NOTE: the parent div should extend the %bcorpBackgroundParent SCSS class.
 */

type Props = {
  /**
   * The whole image src as a string
   */
  imageSrc?: string,
  /**
   * The name of the colour to use, as named in the styleguide. Colour must exists in the styleguide
   */
  overlay?: BCorpColor,
  /**
   * Can pass any other vlaid css colour as a string
   */
  customOverlayColor?: string,
  /**
   * This defines the default when no image or overlay are found.
   */
  skin?: BCorpSkin,
  /**
   * Opacity for the image between 0 and 1.
   * Note: The image is on top of the overlay, so 0.2 here would equate to 80% opacity for the overlay.
   */
  imageOpacity?: number
}

const BCorpBackground = (props: Props) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: getOverlay(props)
        }}
        className={style.overlay}
      />

      <div
        style={getBackgroundStyle(props)}
        className={`${style.image} bcorp-background-image`}
      />
    </div>
  )
}

/**
 * Combine the possible backround image and opacity  to get the background
 */
function getBackgroundStyle (props) {
  const backgroundStyle = {}

  backgroundStyle.backgroundImage = props.imageSrc
    ? `url(${props.imageSrc})`
    : undefined
  backgroundStyle.opacity =
    props.overlay || props.customOverlayColor ? props.imageOpacity : 1

  return backgroundStyle
}

/**
 * Create the overlay, prioritising the custom overlay colour over
 * the styleguide colour passed as the overlay props, over the skin.
 */
function getOverlay (props) {
  if (props.customOverlayColor) {
    return props.customOverlayColor
  }

  const color = lookupColor(props.overlay)
  if (color) {
    return color
  }
  return props.skin === 'dark' ? darkSkinColour : lookupColor('white')
}

BCorpBackground.defaultProps = {
  skin: 'light',
  imageOpacity: 0.4
}

export default BCorpBackground
