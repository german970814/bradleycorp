// @flow
import * as React from 'react'
import type { BCorpColor } from '../../types/styleguide_types'
import SVGArrow from './SVGDefinitions/SVGArrow'

/**
 * Wraps registered SVG files with an API to interact with it more easily
 */

type SVGLine = {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

type Props = {
  /**
   * The slug for the SVG icon to render.
   */
  icon: 'arrow',
  /**
   * Custom class name
   */
  className?: string,
  /**
   * Redraw the icon each time it's hovered over
   */
  redrawOnHover?: boolean,
  /**
   * A colour from the styleguide
   */
  color?: BCorpColor
}

class SVGIcon extends React.Component<Props> {
  render () {
    if (this.props.icon === 'arrow') {
      return (
        <SVGArrow
          className={this.props.className}
          redrawOnHover={this.props.redrawOnHover}
          color={this.props.color}
        />
      )
    }
  }
}

export default SVGIcon
export type { SVGLine }
