// @flow
import * as React from 'react'
import type {
  LiteraturePost,
  ChipSamplePost
} from '../../../../../../lib/types/cpt_types'
import AddToOrderButton from './AddToOrderButton/AddToOrderButton'
import DownloadIcon from './DownloadIcon/DownloadIcon'
import FeaturedImage from './FeaturedImage/FeaturedImage'
import VerticalAlignHelper from '../../../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './Option.scss'

type Props = {
  post: LiteraturePost | ChipSamplePost,
  addToShipment: (postToAdd: LiteraturePost | ChipSamplePost) => void,
  addToDownloads: (postToAdd: LiteraturePost) => void,
  isMobile: boolean
}

class Option extends React.Component<Props> {
  renderTitle () {
    return this.props.post.post.post_title ? (
      <h5 className={style.title}>{this.props.post.post.post_title}</h5>
    ) : null
  }

  renderAddButton () {
    return (
      <div
        className={
          this.props.isMobile ? style.addButton : style.addButtonDesktop
        }>
        <AddToOrderButton
          addToShipment={this.props.addToShipment}
          addToDownloads={this.props.addToDownloads}
          isMobile={this.props.isMobile}
          post={this.props.post}
        />
      </div>
    )
  }

  renderDownloadIcon () {
    return this.props.post.post.post_type === 'literature' ? (
      <div className={style.downloadIcon}>
        <DownloadIcon
          literature={this.props.post}
          isMobile={this.props.isMobile}
        />
      </div>
    ) : null
  }

  render () {
    const postTypeClassName =
      this.props.post.post.post_type === 'literature'
        ? style.literature
        : style.chipSample

    return this.props.isMobile ? (
      <div className={`col1 ${style.option} ${postTypeClassName}`}>
        <div className={'row'}>
          <div className={`inline-col4-middle ${style.imgContainer}`}>
            <FeaturedImage
              post={this.props.post}
              isMobile={this.props.isMobile}
            />
          </div>
          <div className={`inline-col4x3-middle ${style.contentContainer}`}>
            {this.renderTitle()}
            {this.renderAddButton()}
            {this.renderDownloadIcon()}
          </div>
        </div>
      </div>
    ) : (
      <div className={`col2 ${style.option} ${postTypeClassName}`}>
        <div className={`row ${style.optionRow}`}>
          <div className={`col4 ${style.imgContainer}`}>
            <FeaturedImage
              post={this.props.post}
              isMobile={this.props.isMobile}
            />
          </div>
          <div className={`col4x3 ${style.contentContainer}`}>
            <div className={style.overflow}>
              <VerticalAlignHelper />
              {this.renderTitle()}
            </div>

            <div className={style.buttons}>
              {this.renderAddButton()}
              {this.renderDownloadIcon()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Option
