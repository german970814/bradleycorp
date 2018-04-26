// @flow
import * as React from 'react'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import Videos from './Videos/Videos'
import Filters from './Filters/Filters'
import style from './VideoGallery.scss'

const videoTypeDefault: 'videoType' = 'videoType'
const productTypeDefault: 'productType' = 'productType'

type FiltersType = {
  video_gallery_type_cat: string,
  video_gallery_product_tag: string,
  search?: string
}

type Props = {}

type State = {
  filters: FiltersType
}

class VideoGallery extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      filters: {
        video_gallery_type_cat: videoTypeDefault,
        video_gallery_product_tag: productTypeDefault,
        search: ''
      }
    }
  }

  updateFilters (filters: FiltersType) {
    this.setState({ filters })
  }

  render () {
    return (
      <DefaultTemplate
        data={{ page_title: 'Video Gallery' }}
        renderModules={() => {
          return (
            <div className={style.VideoGallery}>
              <Filters
                filters={this.state.filters}
                updateFilters={this.updateFilters.bind(this)}
              />
              <Videos filters={this.state.filters} />
            </div>
          )
        }}
      />
    )
  }
}

export default VideoGallery

export { videoTypeDefault, productTypeDefault }
export type { FiltersType }
