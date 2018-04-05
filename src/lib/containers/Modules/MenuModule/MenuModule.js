import React from 'react'
import PropTypes from 'prop-types'
import BCorpModule from '../BCorpModule'
import NavMenuApiClient from '../../../../api/navMenu_client'
import MenuBlock from './MenuBlock/MenuBlock'
import style from './MenuModule.scss'

class MenuModule extends BCorpModule {
  constructor (props) {
    super(props, style, 'menuModule')

    this.defaultState = {
      menuBlocks: []
    }

    this.state = {
      ...this.state,
      ...this.defaultState
    }
  }

  componentDidMount () {
    super.componentDidMount()

    this.getMenu(this.props.menuSlug)
  }

  componentWillReceiveProps (nextProps) {
    super.componentWillReceiveProps(nextProps)

    if (nextProps.menuSlug !== this.props.menuSlug) {
      this.getMenu(nextProps.menuSlug)
    }
  }

  renderTitle () {
    if (!this.props.title) {
      return
    }

    return <h3 className={style.title}>{this.props.title}</h3>
  }

  renderMenuBlocks () {
    return this.state.menuBlocks.map((menuBlock, index) => {
      return (
        <div key={index} className={style.menuBlockWrapper}>
          <MenuBlock blockData={menuBlock} />
        </div>
      )
    })
  }

  renderModule () {
    return (
      <div className={`row ${this.containerClassName}`}>
        {this.renderTitle()}

        {this.renderMenuBlocks()}
      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    if (!this.state.menuBlocks || this.state.menuBlocks.length === 0) {
      return false
    }

    return true
  }

  async getMenu (menuSlug) {
    try {
      const menuResponse = await NavMenuApiClient.getNavMenuBySlug(
        menuSlug,
        true
      )
      const menuData = menuResponse.data

      this.setState({ menuBlocks: menuData })
    } catch (err) {
      console.log(err)
    }
  }
}

MenuModule.propTypes = {
  ...BCorpModule.propTypes,

  title: PropTypes.string,
  menuSlug: PropTypes.string
}

export default MenuModule
