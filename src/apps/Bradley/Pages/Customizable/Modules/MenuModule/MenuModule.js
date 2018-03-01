import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavMenuApiClient from '../../../../../../api/navMenu_client'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import MenuBlock from './MenuBlock/MenuBlock'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './MenuModule.scss'

class MenuModule extends Component {
  constructor (props) {
    super(props)

    this.defaultState = {
      menuBlocks: []
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    this.getMenu(this.props.menuSlug)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.menuSlug !== this.props.menuSlug) {
      this.getMenu(nextProps.menuSlug)
    }
  }

  renderTitle () {
    if (!this.props.title) {
      return
    }

    return (
      <h5 className={style.title} >
        {this.props.title}
      </h5>
    )
  }

  renderMenuBlocks () {
    if (!this.state.menuBlocks || this.state.menuBlocks.length === 0) {
      return
    }

    return this.state.menuBlocks.map((menuBlock, index) => {
      return (
        <div
          key={index}
          className={style.menuBlockWrapper} >

          <MenuBlock
            blockData={menuBlock} />

        </div>
      )
    })
  }

  render () {
    return (
      <div
        ref={(node) => {
          if (!this.node) {
            this.node = node
          }
        }}
        className={`${style.menuModule} ${moduleStyle.module}`} >

        <ContainerMediaQuery
          node={this.node} >
          {(containerClassName) => {
            return (
              <div className={`row ${containerClassName}`} >

                {this.renderTitle()}

                {this.renderMenuBlocks()}

              </div>
            )
          }}
        </ContainerMediaQuery >

      </div>
    )
  }

  async getMenu (menuSlug) {
    try {
      const menuResponse = await NavMenuApiClient.getNavMenuBySlug(menuSlug, true)
      const menuData = menuResponse.data

      this.setState({ menuBlocks: menuData })
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 *
 * Make sure to extend these propTypes in child classes using:
 * ...MenuModule.propTypes
 * at the top of the child propTypes object
 *
 */
MenuModule.propTypes = {
  title: PropTypes.string,
  menuSlug: PropTypes.string
}

export default MenuModule
