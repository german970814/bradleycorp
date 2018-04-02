import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { rotate } from '../../../../../../../../lib/bcorpArray'
import ScrollableList from '../../../../../../../../lib/containers/ScrollableList/ScrollableList'
import ButtonLeft from './ButtonLeft'
import ButtonRight from './ButtonRight'
import style from './SelectedImageLightboxContent.scss'

class SelectedImageLightboxContent extends Component {
  componentWillMount () {
    this.items = this.props.items

    if (this.items[0].props.src !== this.props.firstItemSrc) {
      let selectedIndex = 0
      this.items.forEach((item, index) => {
        if (item.props.src === this.props.firstItemSrc) {
          selectedIndex = index
        }
      })
      this.items = rotate(this.items, selectedIndex)
    }
  }

  render () {
    return (
      <ScrollableList
        numberToDisplay={1}
        touchMoveSensitivity={2}
        onPositionChange={this.props.onPositionChange}
        buttonDown={<ButtonRight />}
        buttonUp={<ButtonLeft />}
        wrapperClassName={style.wrapper}
        stopEventBubblingFromButtons>
        {this.items}
      </ScrollableList>
    )
  }
}

SelectedImageLightboxContent.propTypes = {
  items: PropTypes.array.isRequired,
  firstItemSrc: PropTypes.string.isRequired,
  onPositionChange: PropTypes.func
}

export default SelectedImageLightboxContent
