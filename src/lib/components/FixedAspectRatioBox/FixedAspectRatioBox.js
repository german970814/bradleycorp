// @flow
import * as React from 'react'
import VerticalAlignHelper from '../VerticalAlignHelper/VerticalAlignHelper'
import style from './FixedAspectRatioBox.scss'

type Props = {
  /**
   * Content for the box.
   * Usually this is something we want to give an aspect ratio, so it would have width and height 100%.
   */
  children: React.Node,
  /**
   * If we have strange screen sizes (very thin but wide) this ensures we keep the aspect ratio.
   * Usually best to leave it as default.
   */
  maxHeight?: string,
  /**
   *  The aspect ratio as a decimal, or number between 1 and 100 representing a percentage
   *  YouTube default is 56.25%
   */
  aspectRatio?: number,
  verticalAlign?: 'top' | 'middle' | 'bottom'
}

/**
 * Creates a box that keeps the same aspect ratio regardless of screen size
 */
class FixedAspectRatioBox extends React.Component<Props> {
  maxHeight: string
  aspectRatio: number
  verticalAlign: 'top' | 'middle' | 'bottom'

  constructor (props: Props) {
    super(props)

    /**
      if we want to pass a calc() string, pass the contents of the calc only
      eg. 'calc(100vh - 20px)' => '100vh - 20px'
    */
    this.maxHeight = '100vh'
    this.aspectRatio = 56.25
    this.verticalAlign = 'middle'
  }

  render () {
    const aspectRatio100 =
      this.props.aspectRatio && this.props.aspectRatio < 1
        ? this.props.aspectRatio * 100
        : this.props.aspectRatio || this.aspectRatio

    const aspectRatio = `${aspectRatio100}%`
    const aspectRatioInverse = 100 / aspectRatio100

    return (
      <React.Fragment>
        <VerticalAlignHelper />

        <div
          style={{
            paddingTop: aspectRatio,
            verticalAlign: this.props.verticalAlign || this.verticalAlign
          }}
          className={`${style.aspectRatioBox} aspect-ratio-box`}>
          <div
            className={`${
              style.aspectRatioBoxContent
            } aspect-ratio-box-content`}>
            {/* this height controller div takes over the sizing when window height becomes significantly smaller than width */}
            <div
              style={{
                maxHeight: `calc(${this.props.maxHeight || this.maxHeight})`,
                maxWidth: `calc((${this.props.maxHeight ||
                  this.maxHeight}) * ${aspectRatioInverse})`
              }}
              className={`${
                style.aspectRatioBoxHeightController
              } aspect-ratio-box-height-controller`}>
              {this.props.children}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default FixedAspectRatioBox
