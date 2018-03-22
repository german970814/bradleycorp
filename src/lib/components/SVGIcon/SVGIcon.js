import React, { Component } from 'react'
import { lookupColor } from '../../bcorpStyles'
import PropTypes from 'prop-types'

const icons = {
  arrow: {
    d: 'M90.5,57 L117.8,27.3 L90.5,0 M117.8,27.3 L0,27.3',
    ns: 'http://www.w3.org/2000/svg',
    pathStyle: {
      fill: 'none',
      stroke: '#fff',
      strokeWidth: 4,
      strokeLinecap: 'round',
      strokeMiterlimit: 10,
      transform: 'translate(2,2)'
    },
    viewBox: '0 0 123 61',
    redrawDashArraySize: 123
  }
}

class SVGIcon extends Component {
  constructor (props) {
    super(props)

    this.state = {
      strokeDashoffset: '0px',
      transition: 'none'
    }
    this.redraw = false
  }

  onMouseEnter (e) {
    this.setState({ strokeDashoffset: `${-icons[this.props.icon].redrawDashArraySize}px`, transition: 'none' })

    setTimeout(() => {
      this.setState({ strokeDashoffset: '0px', transition: 'stroke-dashoffset 500ms' })
    }, 30)
  }

  getRedrawStyles () {
    if (!this.props.redrawOnHover) {
      return
    }

    return {
      strokeDashoffset: this.state.strokeDashoffset,
      strokeDasharray: this.props.redrawOnHover ? `${icons[this.props.icon].redrawDashArraySize}px` : undefined,
      transition: this.state.transition
    }
  }

  render () {
    if (!icons[this.props.icon]) {
      console.warn(`icon ${this.props.icon} is not registered in the SVGIcon component`)
      return null
    }

    const customStyles = {
      stroke: this.props.color ? lookupColor(this.props.color) : undefined
    }

    return (
      <svg
        className={this.props.className}
        xmlns={icons[this.props.icon].ns}
        viewBox={icons[this.props.icon].viewBox} >

        <path
          d={icons[this.props.icon].d}
          style={{
            ...icons[this.props.icon].pathStyle,
            ...this.getRedrawStyles(),
            ...customStyles
          }}
          onMouseEnter={this.props.redrawOnHover ? this.onMouseEnter.bind(this) : undefined} />

      </svg>
    )
  }
}

SVGIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  redrawOnHover: PropTypes.bool,
  color: PropTypes.string
}

export default SVGIcon
