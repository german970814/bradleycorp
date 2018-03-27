import React, { Component } from 'react'
import style from './BurgerMenu.scss'

class BurgerMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false
    }
  }

  handleClick () {
    this.setState({ isActive: !this.state.isActive })
  }

  render () {
    const active = this.state.isActive ? 'is-active' : ''

    return (
      <div
        className={style.burgerMenuWrapper} >
        <div
          className={`noSelectBackground hamburger hamburger--squeeze ${active}`}
          onClick={this.handleClick.bind(this)} >
          <span className={'hamburger-box'}>
            <span className={'hamburger-inner'}></span>
          </span>
        </div>
      </div>
    )
  }
}

export default BurgerMenu