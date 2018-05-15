// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'

export default class SearchProducts extends Component {

    renderProducts () {
        return <li>
            <div className={`${style.newH}`}>
                <span className={`${style.new}`}>NEW</span>
                <span className={`${style.h}`}>H</span>
            </div>
            <div className={`${style.productsImageContainer}`}>
                <img src={require('../../../../../images/results/products-mobile.jpg')}/>
            </div>
            <h6 className={`${style.productReference}`}>MODEL S19-304</h6>
            <p className={`${style.productDescription}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </li>
    }

    renderColumns (classes: string) {
        return <FillColumns
          colClasses={[
            `${classes}`, `${classes}`, `${classes}`, `${classes}`
          ]}>
          <ul className={`${style.searchProductsWrapper}`}>
            {this.renderProducts()}
          </ul>
        </FillColumns>
      }

    render () {
        return <div>
            <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
                {match =>
                match ? (
                    // mobile
                    this.renderColumns('col2')
                ) : (
                    <Media query={{ maxWidth: TABLETMAXWIDTH }}>
                    {match =>
                        match ? (
                        // tablet
                        this.renderColumns('col3-tablet')
                        ) : (
                        // desktop
                        this.renderColumns('col4-desktop')
                        )
                    }
                    </Media>
                )
                }
            </Media>
        </div>
    }

}