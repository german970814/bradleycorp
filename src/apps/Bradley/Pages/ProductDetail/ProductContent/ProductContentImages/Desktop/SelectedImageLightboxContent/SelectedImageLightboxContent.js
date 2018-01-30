import React from 'react'
import PropTypes from 'prop-types'
import ScrollableList from '../../../../../../../../lib/containers/ScrollableList/ScrollableList'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './SelectedImageLightboxContent.scss'

const SelectedImageLightboxContent = props => {
  return (
    <ScrollableList
      numberToDisplay={1}
      onPositionChange={props.onPositionChange}
      buttonDown={<ButtonRight />}
      buttonUp={<ButtonLeft />}
      wrapperClassName={style.wrapper}
      stopEventBubblingFromButtons >
      {props.items}
    </ScrollableList>
  )
}

SelectedImageLightboxContent.propTypes = {
  items: PropTypes.array.isRequired,
  onPositionChange: PropTypes.func
}

export default SelectedImageLightboxContent
