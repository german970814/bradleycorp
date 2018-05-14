// @flow
import React, { Component } from 'react'
import style from './../Results.scss'

export default class SearchNews extends Component {
    render(){
        return <div className={`${style.resultsTextContentWrapper}`}>
            <ul className={`${style.newsList}`}>
                <li>
                    <h5><a href="#">Article Name Goes Here</a></h5>
                    <div className={`${style.resultsDate}`}><span>January 1, 2017 - Source goes here</span></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </li>
                <li>
                    <h5><a href="#">Article Name Goes Here</a></h5>
                    <div className={`${style.resultsDate}`}><span>January 1, 2017 - Source goes here</span></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </li>
                <li>
                    <h5><a href="#">Article Name Goes Here</a></h5>
                    <div className={`${style.resultsDate}`}><span>January 1, 2017 - Source goes here</span></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </li>
                <li>
                    <h5><a href="#">Article Name Goes Here</a></h5>
                    <div className={`${style.resultsDate}`}><span>January 1, 2017 - Source goes here</span></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </li>
            </ul>
        </div>
    }
}