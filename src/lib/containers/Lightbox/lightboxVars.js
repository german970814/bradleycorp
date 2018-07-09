import vars from './Lightbox.scss'

/**
 * As far as I'm aware these are no longer in use anywhere,
 * but I havent had time to realllly check and remove them safely
 */

const LIGHTBOXSIZES = {
  height: parseInt(vars.LightboxHeight) / 100, // percentage
  width: parseInt(vars.LightboxWidth) / 100, // percentage
  widthTabletDesktop: parseInt(vars.LightboxWidthTabletDesktop) / 100, // percentage
  closeButtonHeight: parseInt(vars.LightboxCloseButtonHeight), // pixels
  closeButtonDistanceBelow: parseInt(vars.LightboxCloseButtonDistanceBelow), // pixels
  heightMinusCloseButton: `${parseInt(vars.LightboxHeight)}vh - ${parseInt(
    vars.LightboxCloseButtonHeight
  )}px * 2 - ${parseInt(vars.LightboxCloseButtonDistanceBelow)}px`
}

export default LIGHTBOXSIZES
