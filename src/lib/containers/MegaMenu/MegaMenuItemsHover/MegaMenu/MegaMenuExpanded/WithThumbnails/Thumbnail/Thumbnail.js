// @flow
import * as React from 'react'
import ImageFrame from '../../../../../../../components/FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './Thumbnail.scss'

type Props = {
  title: string,
  imgSrc: string
}

class Thumbnail extends React.PureComponent<Props> {
  render () {
    return (
      <div className={style.thumbnail}>
        <h6>{this.props.title}</h6>
        <ImageFrame src={this.props.imgSrc} aspectRatio={80 / 170} />
      </div>
    )
  }
}

export default Thumbnail
