// @flow
import * as React from 'react'
import style from './BurgerMenu.scss'

type Props = {
  onActivate?: () => void,
  onDeactivate?: () => void
}

type State = {
  isActive: boolean
}

/**
 * Renders the Hamburger Squeeze icon from:
 *
 * @see https://jonsuh.com/hamburgers
 */
class BurgerMenu extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      isActive: false
    }
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (this.state.isActive && !prevState.isActive && this.props.onActivate) {
      this.props.onActivate()
    }

    if (!this.state.isActive && prevState.isActive && this.props.onDeactivate) {
      this.props.onDeactivate()
    }
  }

  handleClick () {
    this.setState({ isActive: !this.state.isActive })
  }

  render () {
    const active = this.state.isActive ? 'is-active' : ''

    return (
      <div className={style.burgerMenuWrapper}>
        <div
          className={`noSelectBackground hamburger hamburger--squeeze ${active}`}
          onClick={this.handleClick.bind(this)}>
          <span className={'hamburger-box'}>
            <span className={'hamburger-inner'} />
          </span>
        </div>
      </div>
    )
  }
}

export default BurgerMenu
