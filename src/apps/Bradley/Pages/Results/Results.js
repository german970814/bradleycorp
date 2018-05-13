// @flow
import React, { Component } from 'react'
import BCorpSelectField from '../../../../lib/components/BCorpFilterField/BCorpSelectField'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import style from './Results.scss'

export default class Results extends Component {

    getSearchItems() {
        let items = ['Products','Literature','Technical Info','In The News', 'Web Pages'];
        return items;
    }
    
    renderSelectForMobile() {
        return <div className={`${style.mobileSelectWtapper}`}>
            <BCorpSelectField
                className={`col1 col2-tablet`}
                defaultOptionId={0}
                defaultOptionName={'Products'}
                options={this.getSearchItems()}
            />
      </div>
    }

    renderOptions() {
        return <div className={`row ${defaultStyle.defaultTemplate} ${style.resultsHeaderContainer}`}>
            <ul>
                <li><a href="">Products</a></li>
                <li><a href="">Literature</a></li>
                <li><a href="">Technical Info</a></li>
                <li><a href="">In The News</a></li>
                <li><a href="">Web Pages</a></li>
            </ul>
        </div>
    }

    renderItems() {
        return <ul>
            <li></li>
        </ul>
    }

    render() {
        return (
            <div>
                <div className={`row ${defaultStyle.defaultTemplate} ${style.resultsHeaderContainer}`}>
                    <div className={`${style.resultsSummary}`}><p>You searched for "commercial sink" - 613 Results</p></div>
                    {renderTitle('Search Results', 'col1')}
                </div>
                <div className={`${style.itemsWrapper}`}>
                    <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
                        {match =>
                            match ? (
                                // mobile
                                    this.renderSelectForMobile()    
                                ) : (
                                    this.renderOptions()
                            )
                        }
                    </Media>
                </div>
            </div>
        )
    }   
    
}



