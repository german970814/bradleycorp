// @flow
import * as React from 'react'
import type { ShippingInfoType } from '../../LiteratureAndChipSamples'
import LightboxV2 from '../../../../../../lib/containers/Lightbox/LightboxV2'
import ShippingInfoButton from '../ShippingInfoButton/ShippingInfoButton'

type Props = {
  shippingInfo: ShippingInfoType
}

type State = {}

class ShippingInfo extends React.Component<Props, State> {
  render () {
    return (
      <LightboxV2
        renderChildren={openLightbox => {
          return <ShippingInfoButton onClick={openLightbox} />
        }}
        renderLightboxContents={() => {
          return null
        }}
      />
    )
  }
}

export default ShippingInfo
