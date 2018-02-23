import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './TextWithBackgroundPeelerModule.scss'

class TextWithBackgroundPeelerModule extends Component {
  constructor (props) {
    super(props)

    this.state = {
      node: undefined
    }
  }

  renderTitle () {
    const { title } = this.props

    if (!title) {
      return
    }

    return <h4 className={style.title} >{title}</h4>
  }

  renderText () {
    const { text } = this.props

    if (!text) {
      return
    }

    return <div className={style.text} >{text}</div>
  }

  renderTexture () {
    if (!this.props.backgroundPeeler) {
      return
    }

    const image = `url(${this.props.backgroundPeeler})`

    return (
      <div
        style = {{
          backgroundImage: image
        }}
        className={style.texture} />
    )
  }

  getBackground () {
    if (this.props.background) {
      return `url(${this.props.background})`
    } else {
      return undefined
    }
  }

  render () {
    return (
      <div
        ref={(node) => {
          if (!this.state.node) {
            this.setState({ node })
          }
        }}
        style={{
          background: this.getBackground()
        }}
        className={`${style.textWithBackgroundPeelerModule} ${moduleStyle.module}`} >

        <ContainerMediaQuery
          node={this.state.node} >
          {(containerClassName) => {
            return (
              <div
                className={containerClassName}>

                {this.renderTitle()}

                {this.renderText()}

                {this.renderTexture()}

              </div>
            )
          }}
        </ContainerMediaQuery >

      </div>
    )
  }
}

TextWithBackgroundPeelerModule.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  background: PropTypes.string,
  backgroundPeeler: PropTypes.string,
  skin: PropTypes.string
}

export default TextWithBackgroundPeelerModule
