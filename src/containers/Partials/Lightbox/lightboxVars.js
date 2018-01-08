import vars from './Lightbox.scss'

const LIGHTBOXSIZES = {
  height: parseInt(vars.LightboxHeight) / 100, // percentage
  width: parseInt(vars.LightboxWidth) / 100, // percentage
  widthTabletDesktop: parseInt(vars.LightboxWidthTabletDesktop) / 100, // percentage
  closeButtonHeight: parseInt(vars.LightboxCloseButtonHeight), // pixels
  closeButtonDistanceBelow: parseInt(vars.LightboxCloseButtonDistanceBelow) // pixels
}

export default LIGHTBOXSIZES
