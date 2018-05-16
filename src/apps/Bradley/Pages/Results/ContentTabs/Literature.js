// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'

export default class SearchLiterature extends Default {
  renderLiterature () {
    return this.props.posts && this.props.posts.map((post, index) => {
      return <article key={index}>
        <div className={`${style.literatureImageContainer}`}>
          <img src={require('../../../../../images/results/literature-image.jpg')}/>
        </div>
        <h6 className={`${style.literatureTitle}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
      </article>
    })
  }
  
  renderColumns (classes: string) {
    return <div className={`${style.searchLiteratureWrapper}`}>
      <FillColumns colClasses={[
        `${classes}`, `${classes}`, `${classes}`, `${classes}`
      ]}>
        {this.renderLiterature()}
      </FillColumns>
    </div>
  }
  
  render () {
    return <div>
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
      {match =>
        match ? (
          this.renderColumns('col2')
        ) : <Media query={{ maxWidth: TABLETMAXWIDTH }}>
        {match =>
          match ? (
            this.renderColumns('col4-tablet')  // tablet
          ) : this.renderColumns('col6-desktop')  // desktop
        }
        </Media>
      }
      </Media>
    </div>
  }
}
