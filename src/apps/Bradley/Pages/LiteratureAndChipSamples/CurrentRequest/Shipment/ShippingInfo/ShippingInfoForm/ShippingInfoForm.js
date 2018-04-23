// @flow
import * as React from 'react'
import type { ShippingInfoType } from '../../../../LiteratureAndChipSamples'
// import BCorpSelectField from '../../../../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import BCorpInputField from '../../../../../../../../lib/components/BCorpFilterField/BCorpInputField'
import style from './ShippingInfoForm.scss'

type Props = {
  shippingInfo: ShippingInfoType,
  updateShippingInfo: (newShippingInfo: ShippingInfoType) => void
}

class ShippingInfoForm extends React.Component<Props> {
  updateShippingInfoProperty (propertyName: string, value: string) {
    const newShippingInfo = this.props.shippingInfo
    newShippingInfo[propertyName] = value
    return this.props.updateShippingInfo(newShippingInfo)
  }

  render () {
    return (
      <div className={style.fullNameWrapper}>
        <BCorpInputField
          filterState={this.props.shippingInfo.fullName || ''}
          handleChange={event => {
            return this.updateShippingInfoProperty(
              'fullName',
              event.target.value
            )
          }}
          placeholder={'Full Name'}
        />
      </div>
    )
  }
}

export default ShippingInfoForm
