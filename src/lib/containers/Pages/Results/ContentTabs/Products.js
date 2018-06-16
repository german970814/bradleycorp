// @flow
import React from 'react'
import type { ScreenSize } from '../../../../contexts/ScreenSizeContext'
import type { TemplateProps } from './Default'
import { withScreenSize } from '../../../../contexts/ScreenSizeContext'
import Default from './Default'
import style from './../Results.scss'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import ProductScrollerProduct from '../../../../../lib/containers/ProductScroller/ProductScrollerProduct/ProductScrollerProduct'

type Props = {
  // from withScreenSize HOC
  screenSize: ScreenSize
} & TemplateProps

class SearchProducts extends React.Component<Props> {
  renderProducts () {
    return (
      this.props.posts &&
      this.props.posts.map((post, ind) => {
        return (
          <article key={ind}>
            <ProductScrollerProduct product={post} />
          </article>
        )
      })
    )
  }

  renderColumns (classes: string) {
    return (
      <div className={`${style.searchProductsWrapper}`}>
        <FillColumns
          colClasses={[
            `${classes}`,
            `${classes}`,
            `${classes}`,
            `${classes}`,
            `${classes}`,
            `${classes}`
          ]}>
          {this.renderProducts()}
        </FillColumns>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        {this.props.screenSize === 'mobile'
          ? this.renderColumns('col2')
          : this.props.screenSize === 'tablet'
            ? this.renderColumns('col4-tablet')
            : this.renderColumns('col6-desktop')}
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}

export default withScreenSize(SearchProducts)
