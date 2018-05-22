// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { updateBlur } from '../../App/updateBlur'
import type { RouterHistory } from 'react-router-dom'
import Lightbox from '../../../../lib/containers/Lightbox/Lightbox'
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

  searchApplication (event) {
    event.preventDefault()
    event.stopPropagation()
    this.state.search && this.props.history.push(`/results/${this.state.search}`)
    updateBlur(false)
  }

  render () {
    return (
      <div className={style.magnifyingGlassWrapper}>
        <Lightbox
          backgroundClass={style.lightboxBackground}
          onLightboxOpen={() => {
            return updateBlur(true)
          }}
          onLightboxClose={() => {
            return updateBlur(false)
          }}>
          {/* outside lightbox in header bar */}
          <div className={style.magnifyingGlass}>
            <img
              src={require('../../../../images/magnifying-glass/magnifying-glass@2x.png')}
              className={style.magnifyingGlassImage}
            />
          </div>

          {/* inside lightbox */}

          <React.Fragment>
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
                onClick={this.searchApplication.bind(this)}
              />
            </form>
          </React.Fragment>
        </Lightbox>
      </div>
    )
  }
}

export default withRouter(SearchIcon)
