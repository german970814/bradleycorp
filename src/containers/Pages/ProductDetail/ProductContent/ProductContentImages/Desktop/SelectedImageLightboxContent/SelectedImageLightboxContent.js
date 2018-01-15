import React from 'react'
import PropTypes from 'prop-types'
import ScrollableList from '../../../../../../Partials/ScrollableList/ScrollableList'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './SelectedImageLightboxContent.scss'

const SelectedImageLightboxContent = props => {
  const LightboxCloseButton = props.lightboxCloseButton

  const dims = {
    width: props.style.width,
    height: props.style.height
  }

  return (
    <div
      style={dims}
      className={style.lightboxContentWrapper} >

      <ScrollableList
        numberToDisplay={1}
        onPositionChange={props.onPositionChange}
        buttonDown={<ButtonRight />}
        buttonUp={<ButtonLeft />}
        ulClassName={style.imagesList}
        wrapperClassName={style.wrapper}
        listItemClassName={style.listItem}
        buttonUpContainerClassName={style.buttonUp}
        buttonDownContainerClassName={style.buttonDown}
        stopEventBubblingFromButtons >
        {props.items}
      </ScrollableList>

      <LightboxCloseButton
        onClick={props.lightboxCloseButtonOnClick} />

    </div>
  )
}

SelectedImageLightboxContent.propTypes = {
  items: PropTypes.array.isRequired,
  onPositionChange: PropTypes.func,
  // from lightbox
  lightboxCloseButton: PropTypes.func,
  lightboxCloseButtonOnClick: PropTypes.func,
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  })
}

export default SelectedImageLightboxContent
