import FitLightbox from './FitLightbox'

class FitLightboxYoutube extends FitLightbox { // sets defaults for youtube
  render () {
    return super.render()
  }
}

FitLightboxYoutube.defaultProps = {
  fixedRatio: 0.5625,
  maxWidth: 0.8,
  maxWidthTablet: 0.8
}

export default FitLightboxYoutube
