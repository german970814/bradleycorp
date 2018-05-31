// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { updateBlur } from '../../App/updateBlur'
import type { RouterHistory } from 'react-router-dom'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import VerticalAlignHelper from '../../../../lib/components/VerticalAlignHelper/VerticalAlignHelper'
import style from './SearchIcon.scss'

type Props = {
  history: RouterHistory
}

type State = {
  search: string
}

class SearchIcon extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      search: ''
    }
  }
  handleClick (e) {
    e.stopPropagation()
  }

  searchApplication (event, closeLightbox) {
    event.preventDefault()
    event.stopPropagation()
    this.state.search && this.props.history.push(`/results/${this.state.search}`)
    updateBlur(false)
    closeLightbox && closeLightbox()
  }

  render () {
    return (
      <div className={style.magnifyingGlassWrapper}>
        <LightboxV2
          backgroundClass={style.lightboxBackground}
          fitLightboxToContent
          fullWidth
          renderChildren={openLightbox => {
            return <div className={style.magnifyingGlass}>
              <img
                src={require('../../../../images/magnifying-glass/magnifying-glass@2x.png')}
                className={style.magnifyingGlassImage}
                onClick={openLightbox}
              />
            </div>
          }}
          onLightboxClose={() => {
            return updateBlur(false)
          }}
          onLightboxOpen={() => {
            return updateBlur(true)
          }}
          renderLightboxContents={closeLightbox => {
            return <React.Fragment>
              <VerticalAlignHelper />

              <form className={style.lightboxSearchForm}>
                <input
                  type={'text'}
                  name={'search'}
                  className={style.lightboxSearchFormInput}
                  onClick={this.handleClick.bind(this)}
                  onInput={(e) => { this.setState({ search: e.target.value }) }}
                />

                <input
                  type={'image'}
                  src={require('../../../../images/magnifying-glass/magnifying-glass-white@2x.png')}
                  className={style.submit}
                  onClick={(e) => { this.searchApplication(e, closeLightbox) }}
                />
              </form>
            </React.Fragment>
          }}
        />
      </div>
    )
  }
}

export default withRouter(SearchIcon)
