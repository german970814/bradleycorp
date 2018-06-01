// @flow
import * as React from 'react'
import type { WPTerm } from '../../../types/term_types'
import { Link } from 'react-router-dom'
import style from './BIMRevitOption.scss'

type Props = {
  term: WPTerm,
  toggleSelect: (id: number) => void,
  selected: boolean,
  showProductPageLinks?: boolean
}

class BIMRevitOption extends React.Component<Props> {
  renderTitle () {
    return <h5 className={style.title}>{'s19-220bbf'}</h5>
  }

  renderCheckbox () {
    return (
      <React.Fragment>
        <input
          className={style.checkbox}
          onChange={() => {
            this.props.toggleSelect(this.props.term.term_id)
          }}
          type="checkbox"
          value={this.props.term.term_id}
          id={this.props.term.term_id}
          checked={this.props.selected || false}
        />
        {this.props.selected && (
          <img
            src={require('../../../../images/check/check@2x.png')}
            className={style.check}
          />
        )}
      </React.Fragment>
    )
  }

  renderImage () {
    return (
      <div className={style.image}>
        <div
          style={{
            backgroundImage: `url('http://bradleydev.twoxfour.com/wp-content/uploads/2017/12/layer-19@3x.jpg')`
          }}
          className={style.imageInner}
        />
      </div>
    )
  }

  renderProductPageLink () {
    if (!this.props.showProductPageLinks) {
      return
    }

    return (
      <Link className={`link-orange ${style.productPage}`} to={'#'}>
        {'PRODUCT PAGE'}
      </Link>
    )
  }

  renderDownloadIcon () {
    return (
      <img
        src={require('../../../../images/download-arrow-icon/download@2x.png')}
        className={style.download}
      />
    )
  }

  render () {
    return (
      <div className={style.BIMRevitOption}>
        {this.renderTitle()}
        {this.renderCheckbox()}
        {this.renderImage()}
        {this.renderProductPageLink()}
        {this.renderDownloadIcon()}
      </div>
    )
  }
}

export default BIMRevitOption
