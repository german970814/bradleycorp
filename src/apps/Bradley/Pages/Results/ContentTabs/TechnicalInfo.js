// @flow
import React, { Component } from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../../globals'
import FileDownloadLink from '../../../../../lib/components/FileDownloadLink/FileDownloadLink'
import FillColumns from '../../../../../lib/components/FillColumns/FillColumns'
import style from './../Results.scss'
import Default from './Default'

export default class SearchTechnicalInfo extends Default {
    render(){
        return <div className={`${style.resultsTextContentWrapper}`}>
            <ul className={`${style.techInfoList}`}>
                <li>
                    <FileDownloadLink
                        title={'Link Title'}
                        link={'Article Name Goes Here'}
                        titleClass={`link-orange ${style.tabTextOrange}`}
                        linkClass={style.tabTextOrangeLink}
                        iconClass={style.wordPDFIcon} />
                </li>
                <li>
                    <FileDownloadLink
                        title={'Link Title'}
                        link={'Article Name Goes Here'}
                        titleClass={`link-orange ${style.tabTextOrange}`}
                        linkClass={style.tabTextOrangeLink}
                        iconClass={style.wordPDFIcon} />
                </li>
                <li>
                    <FileDownloadLink
                        title={'Link Title'}
                        link={'Article Name Goes Here'}
                        titleClass={`link-orange ${style.tabTextOrange}`}
                        linkClass={style.tabTextOrangeLink}
                        iconClass={style.wordPDFIcon} />
                </li>    
            </ul>
        </div>
    }
}