import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PositionCircle from './PositionCircle/PositionCircle'
import style from './ScrollableList.scss'

class ScrollableList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      children: this.getChildrenWithScrollableListApiAsProps(this.props)
    }

    this.getChildrenWithScrollableListApiAsProps = this.getChildrenWithScrollableListApiAsProps.bind(this)
    this.renderButtonUp = this.renderButtonUp.bind(this)
    this.renderButtonDown = this.renderButtonDown.bind(this)
    this.buttonUp = this.buttonUp.bind(this)
    this.buttonDown = this.buttonDown.bind(this)
    this.renderButtonsBelow = this.renderButtonsBelow.bind(this)
    this.renderPositionCircles = this.renderPositionCircles.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
    this.getChildrenToDisplay = this.getChildrenToDisplay.bind(this)
    this.childrenDidUpdate = this.childrenDidUpdate.bind(this)
    this.getPosition = this.getPosition.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      children: this.getChildrenWithScrollableListApiAsProps(nextProps)
    })
  }

  getChildrenWithScrollableListApiAsProps (props) {
    return React.Children.map(props.children, (child, index) => {
      return {
        position: index,
        display: index < props.numberToDisplay,
        component: child
      }
    })
  }

  moveList (e, increment) {
    e.preventDefault()

    const children = this.state.children.map((child, index, allChildren) => {
      const position = this.getPosition(child.position, increment, allChildren.length)

      return {
        ...child,
        position: position,
        display: position < this.props.numberToDisplay
      }
    })

    return this.setState({ ...this.state, children })
  }

  renderButtonUp () {
    if (!this.props.positionButtonsBelow) {
      return this.buttonUp()
    }
  }

  renderButtonDown () {
    if (!this.props.positionButtonsBelow) {
      return this.buttonDown()
    }
  }

  renderButtonsBelow () {
    if (this.props.positionButtonsBelow) {
      return (
        <div
          className={[style.buttonsBelow, this.props.buttonsBelowClassName].join(' ')}>
          {this.buttonUp()}
          <img
            className={style.buttonsBelowSeparator}
            src={require('../../../images/prev-next-separator/prev-next-separator@2x.png')} />
          {this.buttonDown()}
        </div>
      )
    }
  }

  buttonUp () {
    return (
      <div
        className={[style.buttonUp, this.props.buttonUpContainerClassName].join(' ')}
        onClick={ (e) => { this.moveList(e, 1) } } >
        {this.props.buttonUp}
      </div>
    )
  }

  buttonDown () {
    return (
      <div
        className={[style.buttonDown, this.props.buttonDownContainerClassName].join(' ')}
        onClick={ (e) => { this.moveList(e, -1) } } >
        {this.props.buttonDown}
      </div>
    )
  }

  renderPositionCircles () {
    if (!this.props.showPosition) {
      return
    }

    return (
      <ul
        className={style.positionCircles}>
        {this.state.children.map((child, index) => {
          return (
            <li
              key={index} >
              <PositionCircle
                selected={child.display} />
            </li>
          )
        })}
      </ul>
    )
  }

  renderChildren () {
    const displayChildren = this.getChildrenToDisplay()
    const displayChildrenSorted = this.sortChildrenByPosition(displayChildren)

    return displayChildrenSorted.map((child, index) => {
      return (
        <li
          key={index}
          className={this.props.listItemClassName} >
          {child.component}
        </li>
      )
    })
  }

  render () {
    return (
      <div
        className={this.props.wrapperClassName}>
        {this.renderButtonUp()}
        <ul
          className={this.props.ulClassName}>
          {this.renderChildren()}
        </ul>
        {this.renderButtonDown()}
        {this.renderButtonsBelow()}
        {this.renderPositionCircles()}

      </div>
    )
  }

  getPosition (prevPos, increment, arrayLength) {
    // we want items to cycle the other way if vertical
    if (this.props.reverseScroll) {
      increment = -increment
    }

    const position = (prevPos + increment) % arrayLength
    return position < 0
      ? arrayLength + position
      : position
  }

  getChildrenToDisplay () {
    return this.state.children.filter(child => {
      return child.display
    })
  }

  sortChildrenByPosition (children) {
    return children.sort((child1, child2) => {
      return child1.position - child2.position
    })
  }

  childrenDidUpdate (newChildren, children) {
    if (newChildren.length !== children.length) {
      return true
    }

    children.forEach((child, index) => {
      if (newChildren[index].type !== child.type) {
        return true
      }

      if (newChildren[index].props !== child.props) {
        return true
      }
    })

    return false
  }

  numberToDisplayDidUpdate (newNumber, oldNumber) {
    return newNumber !== oldNumber
  }
}

ScrollableList.propTypes = {
  numberToDisplay: PropTypes.number.isRequired,
  showPosition: PropTypes.bool,
  reverseScroll: PropTypes.bool,
  children: PropTypes.array.isRequired,
  wrapperClassName: PropTypes.string,
  listItemClassName: PropTypes.string,
  ulClassName: PropTypes.string,
  buttonUpContainerClassName: PropTypes.string,
  buttonDownContainerClassName: PropTypes.string,
  buttonsBelowClassName: PropTypes.string,
  buttonUp: PropTypes.element.isRequired,
  buttonDown: PropTypes.element.isRequired,
  positionButtonsBelow: PropTypes.bool
}

export default ScrollableList
