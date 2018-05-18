// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'
import ProductScrollerProduct from '../../../../../lib/containers/ProductScroller/ProductScrollerProduct/ProductScrollerProduct'

export default class SearchProducts extends Default {

  renderProducts () {
    return this.props.posts && this.props.posts.map((post, ind) => {
      return (
        <article>
          <ProductScrollerProduct
            key={ind}
            product={post} />
        </article>
      )
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
}
