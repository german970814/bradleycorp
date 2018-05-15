// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'

export default class SearchProducts extends Default {
  renderProducts () {
    return this.props.posts && this.props.posts.map((post, ind) => {
      return <article key={ind}>
        <div className={`${style.newH}`}>
          <span className={`${style.new}`}>NEW</span>
          <span className={`${style.h}`}>H</span>
        </div>
        <div className={`${style.productsImageContainer}`}>
          <img src={require('../../../../../images/results/products-mobile.jpg')}/>
        </div>
        <h6 className={`${style.productReference}`}>MODEL S19-304</h6>
        <p className={`${style.productDescription}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </article>
    })
  }
  
  renderColumns (classes: string) {
    return <div className={`${style.searchProductsWrapper}`}>
      <FillColumns colClasses={[ `${classes}`, `${classes}`, `${classes}`, `${classes}` ]}>
        {this.renderProducts()}
      </FillColumns>
    </div>
  }
  
  render () {
    return <div>
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
      { match =>
        match ? (
          this.renderColumns('col2')  // mobile
        ) : <Media query={{ maxWidth: TABLETMAXWIDTH }}>
          { match =>
            match ? (
              this.renderColumns('col3-tablet')  // tablet
            ) : this.renderColumns('col4-desktop')  // desktop
          }
        </Media>
      }
      </Media>
    </div>
  } 
}
