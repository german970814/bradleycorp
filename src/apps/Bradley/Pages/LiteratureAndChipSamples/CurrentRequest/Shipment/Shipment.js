// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../../lib/types/cpt_types'
import type { ShipmentTypes } from '../../LiteratureAndChipSamples'
import BCorpWidget from '../../../../../../lib/containers/Widgets/BCorpWidget'
// import style from './Shipment.scss'

type Props = {
  shipment?: ShipmentTypes,
  addToShipment: (postToAdd: LiteraturePost | ChipSamplePost) => void,
  removeFromShipment: (idToRemove: number) => void
}

class Shipment extends React.Component<Props> {
  render () {
    return (
      <BCorpWidget
        title={'Your Shipment'}
        className={'col1 col2-tablet col1-desktop'}
        twoColsOnTablet>
        {'content'}
      </BCorpWidget>
    )
  }
}

export default Shipment
