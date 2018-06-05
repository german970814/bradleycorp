import React, { Component } from 'react'
import { lookupColor } from '../../bcorpStyles'
import PropTypes from 'prop-types'

const icons = {
  arrow: {
    // d: 'M90.5,57 L117.8,27.3 L90.5,0 M117.8,27.3 L0,27.3',
    lines: [
      {
        x1: '39.7',
        y1: '10.8',
        x2: '1',
        y2: '10.8'
      },
      {
        x1: '39.7',
        y1: '10.8',
        x2: '29.9',
        y2: '20.6'
      },
      {
        x1: '39.7',
        y1: '10.8',
        x2: '29.9',
        y2: '1'
      }
    ],
    ns: 'http://www.w3.org/2000/svg',
    pathStyle: {
      fill: 'none',
      stroke: '#fff',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeMiterlimit: 10
      // transform: 'translate(2,2)'
    },
    viewBox: '0 0 40.7 21.6',
    redrawDashArraySize: 40,
  }
}

/**
 * Wraps registered SVG files with an API to interact with it more easily
 */
class SVGArrow extends Component {
  constructor (props) {
    super(props)


    ns = 'http://www.w3.org/2000/svg'
    viewBox = '0 0 40.7 21.6'
    lines = [
      {
        name: 'line1',
        dashOffset: 40,
        x1: '39.7',
        y1: '10.8',
        x2: '1',
        y2: '10.8'
      },
      {
        name: 'line2',
        dashOffset: 10,
        x1: '39.7',
        y1: '10.8',
        x2: '29.9',
        y2: '20.6'
      },
      {
        name: 'line3',
        dashOffset: 10,
        x1: '39.7',
        y1: '10.8',
        x2: '29.9',
        y2: '1'
      }
    ]


    this.state = {

      line1DashOffset: '0px'
      line2DashOffset: '0px'
      line3DashOffset: '0px'


      strokeDashoffset: '0px',
      transition: 'none'
    }
    this.redraw = false
  }

  onMouseEnter (e) {

    const dash = this.lines.find( line => {
      return line.name === 'line1' && `${line.dashOffset}px`
    })

    console.log( dash )

    this.setState({
      strokeDashoffset: `${icons[this.props.icon].redrawDashArraySize}px`,
      transition: 'none'
    })

    setTimeout(() => {
      this.setState({
        strokeDashoffset: '0px',
        transition: 'stroke-dashoffset 500ms'
      })
    }, 30)
  }

  getRedrawStyles ( n ) {
    console.log( n )
    if (!this.props.redrawOnHover) {
      return
    }

    return {
      strokeDashoffset: this.state.strokeDashoffset,
      strokeDasharray: this.props.redrawOnHover
        ? `${icons[this.props.icon].redrawDashArraySize}px`
        : undefined,
      transition: this.state.transition
    }
  }

  render () {
    if (!icons[this.props.icon]) {
      console.warn(
        `icon ${this.props.icon} is not registered in the SVGArrow component`
      )
      return null
    }

    const customStyles = {
      stroke: this.props.color ? lookupColor(this.props.color) : undefined
    }

    return (
      <svg
        className={this.props.className}
        xmlns={icons[this.props.icon].ns}
        viewBox={icons[this.props.icon].viewBox}
        onMouseEnter={
          this.props.redrawOnHover ? this.onMouseEnter.bind(this) : undefined
        }>
        {/* <path
          d={icons[this.props.icon].d}
          style={{
            ...icons[this.props.icon].pathStyle,
            ...this.getRedrawStyles(),
            ...customStyles
          }}
        /> */}
        {icons[this.props.icon].lines.map((line, ind) => {
          return <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            key={ind}
            style={{
              ...icons[this.props.icon].pathStyle,
              ...this.getRedrawStyles( (line.x1 - line.x2) ),
              ...customStyles
            }}/>
        })}
      </svg>
    )
  }
}

SVGArrow.propTypes = {
  /**
   * The slug for the SVG icon to render.
   * Must be registered within the class
   */
  icon: PropTypes.oneOf(['arrow']).isRequired,
  className: PropTypes.string,
  /**
   * Redraws the icon each time it's hovered over
   */
  redrawOnHover: PropTypes.bool,
  /**
   * A colour from the styleguide
   */
  color: PropTypes.string
}

export default SVGArrow