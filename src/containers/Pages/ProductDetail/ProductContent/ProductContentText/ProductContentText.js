import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoGrowShrinkAnimation from '../../../../Partials/AutoGrowShrinkAnimation/AutoGrowShrinkAnimation'
import style from './ProductContentText.scss'

class ProductContentText extends Component {
  renderText (isOpen) {
    if (!this.props.content) {
      return
    }
    return isOpen
      ? this.props.content
      : this.props.content.substring(0, 401)
  }

  renderMoreDetailsButtonText (isOpen) {
    return isOpen
      ? '- Less Detail'
      : '+ More Detail'
  }

  render () {
    return (
      <AutoGrowShrinkAnimation
        node={this.node}
        speed={600}
        easing={'cubic-bezier(0.86, 0, 0.07, 1)'} >

        {(isOpen, openClose) => {
          return (
            <div>
              <div
                ref={(node) => { this.node = node }}
                className={style.content}
                dangerouslySetInnerHTML={{__html: this.renderText(isOpen)}} />
              <div
                className={style.moreDetail}>
                <div
                  onClick={() => openClose()} >
                  {this.renderMoreDetailsButtonText(isOpen)}
                </div>
              </div>
            </div>
          )
        }}

      </AutoGrowShrinkAnimation>
    )
  }
}

ProductContentText.propTypes = {
  content: PropTypes.string
}

export default ProductContentText
