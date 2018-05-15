// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'

export default class SearchLiterature extends Default {
  renderLiterature () {
    return <li>
      <div className={`${style.literatureImageContainer}`}>
        <img src={require('../../../../../images/results/literature-image.jpg')}/>
      </div>
      <h6 className={`${style.literatureTitle}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
    </li>
  }

  renderColumns (classes: string) {
    return <FillColumns
      colClasses={[
        `${classes}`, `${classes}`, `${classes}`, `${classes}`
      ]}>
      <ul className={`${style.searchLiteratureWrapper}`}>
        {this.renderLiterature()}
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
