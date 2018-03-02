import React, { Component } from 'react'
import ContainerMediaQuery from '../../containers/ContainerMediaQuery/ContainerMediaQuery'
import moduleStyle from './Modules.scss'

class BCorpModule extends Component {
  constructor (props, localStyle, moduleName) {
    super(props)

    this.state = {
      node: undefined
    }

    this.moduleName = moduleName
    this.localStyle = localStyle

    this.containerClassName = ''
    this.size = ''
  }

  renderModule () {

  }

  render () {
    if (!this.passesValidation()) {
      return (
        <div
          ref={(node) => {
            if (!this.state.node) {
              this.setState({ node })
            }
          }}
          className={`${moduleStyle.module} ${this.localStyle[this.moduleName]}`} />
      )
    }

    return (
      <div
        ref={(node) => {
          if (!this.state.node) {
            this.setState({ node })
          }
        }}
        className={`${moduleStyle.module} ${this.localStyle[this.moduleName]}`} >

        <ContainerMediaQuery
          node={this.state.node} >
          {(containerClassName, size) => {
            this.containerClassName = containerClassName
            this.size = size

            return this.renderModule()
          }}
        </ContainerMediaQuery >

      </div>
    )
  }

  passesValidation () {
    return true
  }
}

export default BCorpModule
