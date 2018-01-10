import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tabStyle from '../Tabs.scss'
import style from './TabWarranty.scss'

class TabWarranty extends Component {
  constructor (props) {
    super(props)

    this.renderWarranty = this.renderWarranty.bind(this)
  }

  renderWarranty () {
    return this.props.warranty.map((warranty, index) => {
      return (
        <div
          key={index}
          className={style.warranty} >

          <div
            dangerouslySetInnerHTML={{__html: warranty.post['post_content']}} />
        </div>
      )
    })
  }

  render () {
    return (
      <div
        className={[style.tabWarranty, tabStyle.fullWidthColDesktopTab].join(' ')}>
        <h5
          className={`${tabStyle.tabColTitle} ${style.title}`} >
          {'Warranty'}
        </h5>
        {this.renderWarranty()}
      </div>
    )
  }
}

TabWarranty.propTypes = {
  warranty: PropTypes.array.isRequired
}

export default TabWarranty
