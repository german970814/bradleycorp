// @flow
import React from 'react'
import type { ScreenSize } from '../../../../contexts/ScreenSizeContext'
import type { TemplateProps } from './Default'
import { withScreenSize } from '../../../../contexts/ScreenSizeContext'
import Default from './Default'
import style from './../Results.scss'
import FillGrid, {
  getColumnClassesForGrid
} from '../../../../../lib/components/FillGrid/FillGrid'
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

  renderColumns (colClass: string, rowLength: number) {
    const colClasses = getColumnClassesForGrid(colClass, rowLength)

    return (
      <div className={`${style.searchProductsWrapper}`}>
        <FillGrid colClasses={colClasses}>{this.renderProducts()}</FillGrid>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        {this.props.screenSize === 'mobile'
          ? this.renderColumns('col2', 2)
          : this.props.screenSize === 'tablet'
            ? this.renderColumns('col4-tablet', 4)
            : this.renderColumns('col6-desktop', 6)}
      </div>
    )
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}

export default withScreenSize(SearchProducts)
