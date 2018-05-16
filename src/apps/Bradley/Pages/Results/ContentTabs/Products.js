// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'
import type { ProductPost } from '../../../../../lib/types/cpt_types'

export default class SearchProducts extends Default {

  renderProducts () {
    return this.props.posts && this.props.posts.map((post, ind) => {
      return <article key={ind}>
        <div className={`${style.newH}`}>
          {this.isProductNew(post) && <span className={`${style.new}`}>NEW</span>}
          <span className={`${style.h}`}>H</span>
        </div>
        <div className={`${style.productsImageContainer}`}>
          {post.meta.product_media.images.length && 
            <img src={Array.isArray(post.meta.product_media.images) ? post.meta.product_media.images[0] : post.meta.product_media.images} />}
        </div>
        <h6 className={`${style.productReference}`}>MODEL {post.meta.product_sku}</h6>
        <p className={`${style.productDescription}`}>{post.post.post_excerpt}</p>
      </article>
    })
  }

  isProductNew(product: ProductPost) {
    const dateUntilNew = new Date(product.meta.product_new_until)
    const today = new Date()
    return today < dateUntilNew
  }

  renderColumns (classes: string) {
    return <div className={`${style.searchProductsWrapper}`}>
      <FillColumns colClasses={[ `${classes}`, `${classes}`, `${classes}`, `${classes}`, `${classes}`, `${classes}` ]}>
        {this.renderProducts()}
      </FillColumns>
    </div>
  }

  render () {
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
