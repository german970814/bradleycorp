// @flow
import React from 'react'
import Media from 'react-media'
import Default from './Default'
import style from './../Results.scss'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import ProductScrollerProduct from '../../../../../lib/containers/ProductScroller/ProductScrollerProduct/ProductScrollerProduct'
import type { TemplateProps } from './Default'

export default class SearchProducts extends React.Component<TemplateProps> {
  renderProducts () {
    return this.props.posts && this.props.posts.map((post, ind) => {
      return <article key={ind}>
        <ProductScrollerProduct product={post} />
      </article>
    })
  }

  renderColumns (classes: string) {
    return <div className={`${style.searchProductsWrapper}`}>
      <FillColumns colClasses={[ `${classes}`, `${classes}`, `${classes}`, `${classes}`, `${classes}`, `${classes}` ]}>
        {this.renderProducts()}
      </FillColumns>
    </div>
  }

  renderContent () {
    return <div>
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        { match =>
          match ? (
            this.renderColumns('col2') // mobile
          ) : <Media query={{ maxWidth: TABLETMAXWIDTH }}>
            { match =>
              match ? (
                this.renderColumns('col4-tablet') // tablet
              ) : this.renderColumns('col6-desktop') // desktop
            }
          </Media>
        }
      </Media>
    </div>
  }

  render () {
    return <Default render={this.renderContent.bind(this)} {...this.props} />
  }
}
