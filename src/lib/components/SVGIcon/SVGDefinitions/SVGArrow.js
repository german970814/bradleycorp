// @flow
import * as React from 'react'
import type { BCorpColor } from '../../../types/styleguide_types'
import type { SVGLine } from '../SVGIcon'
import { lookupColor } from '../../../bcorpStyles'

/**
 * Defines the SVGArrow with the redraw on hover animation
 */

type Props = {
  className?: string,
  /**
   * Redraws the icon each time it's hovered over
   */
  redrawOnHover?: boolean,
  /**
   * A colour from the styleguide
   */
  color?: BCorpColor
}

type State = {
  strokeDashoffset: string,
  transition: string
}

class SVGArrow extends React.Component<Props, State> {
  ns: string
  viewBox: string
  lines: Array<SVGLine>
  redrawDashArraySize: number
  pathStyle: {}

  constructor (props: Props) {
    super(props)

    // define the SVG
    this.ns = 'http://www.w3.org/2000/svg'
    this.viewBox = '0 0 40.7 21.6'
    this.lines = [
      {
        x1: 1,
        y1: 10.8,
        x2: 39.7,
        y2: 10.8
      },
      {
        x1: 39.7,
        y1: 10.8,
        x2: 29.9,
        y2: 20.6
      },
      {
        x1: 39.7,
        y1: 10.8,
        x2: 29.9,
        y2: 1
      }
    ]
    this.redrawDashArraySize = 40
    this.pathStyle = {
      fill: 'none',
      stroke: '#fff',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeMiterlimit: 10
      // transform: 'translate(2,2)'
    }

    // initiate state ready for animation
    this.state = {
      // line1DashOffset: '0px'
      // line2DashOffset: '0px'
      // line3DashOffset: '0px'

      strokeDashoffset: '0px',
      transition: 'none'
    }
  }

  onMouseEnter (e: SyntheticEvent<HTMLElement>) {
    // reset animation with no transition
    this.setState({
      strokeDashoffset: `${this.redrawDashArraySize}px`,
      transition: 'none'
    })

    // animate stroke dashoffset
    setTimeout(() => {
      this.setState({
        strokeDashoffset: '0px',
        transition: 'stroke-dashoffset 500ms'
      })
    }, 30)
  }

  getRedrawStyles (n: number) {
    if (!this.props.redrawOnHover) {
      return
    }

    return {
      strokeDashoffset: this.state.strokeDashoffset,
      strokeDasharray: `${this.redrawDashArraySize}px`,
      transition: this.state.transition
    }
  }

  render () {
    const customStyles = {
      stroke: this.props.color ? lookupColor(this.props.color) : undefined
    }

    return (
      <svg
        className={this.props.className}
        xmlns={this.ns}
        viewBox={this.viewBox}
        onMouseEnter={
          this.props.redrawOnHover ? this.onMouseEnter.bind(this) : undefined
        }>
        {this.lines.map((line, ind) => {
          return (
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              key={ind}
              style={{
                ...this.pathStyle,
                ...this.getRedrawStyles(line.x1 - line.x2),
                ...customStyles
              }}
            />
          )
        })}
      </svg>
    )
  }
}

export default SVGArrow
