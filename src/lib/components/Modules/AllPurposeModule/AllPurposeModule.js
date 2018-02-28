import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContainerMediaQuery from '../../../containers/ContainerMediaQuery/ContainerMediaQuery'
import moduleStyle from '../Modules.scss'
import style from './AllPurposeModule.scss'

class AllPurposeModule extends Component {
  constructor (props) {
    super(props)

    this.state = {
      node: undefined
    }
  }

  render () {
    if (!this.props.content) {
      return null
    }

    return (
      <div
        ref={(node) => {
          if (!this.state.node) {
            this.setState({ node })
          }
        }}
        className={`${style.allPurposeModule} ${moduleStyle.module}`} >

        <ContainerMediaQuery
          node={this.state.node} >
          {(containerClassName) => {
            return (
              <div
                className={containerClassName} >

                <div
                  className={style.content}
                  dangerouslySetInnerHTML={{ __html: decodeURIComponent(this.props.content) }} />

              </div>
            )
          }}
        </ContainerMediaQuery>

      </div>
    )
  }
}

AllPurposeModule.propTypes = {
  content: PropTypes.string
}

export default AllPurposeModule
