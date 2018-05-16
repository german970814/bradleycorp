// @flow
import React, { Component } from 'react'
import type { BCorpPost } from '../../../../lib/types/post_types'
import BCorpSelectField from '../../../../lib/components/BCorpFilterField/BCorpSelectField'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import style from './Results.scss'
import axios from 'axios'
import api from './../../../../api/index'
import SearchClient from './../../../../api/search_client'

import Loadable from 'react-loadable'
import Loading from '../../../../lib/components/Loading/Loading'
import LoadMore from '../../../../lib/containers/LoadMore/LoadMore'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../lib/containers/LoadMore/LoadMore'
import type { Location, Match } from 'react-router-dom'

type Props = {
  location: Location,
  match: { params: { query: string } } & Match
}

type State = {
  selected: string,
  components: {
    [string]: Object
  },
  resultCount: {
    [string]: Number
  },
  results: {
    [string]: Array<BCorpPost>
  }
}

export default class Results extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      selected: 'product',
      components: {},
      resultCount: {},
      results: {}
    }
  }

  get getTabs () {
    return {
      product: 'Products',
      literature: 'Literature',
      technical_info: 'Technical Info',
      news: 'In The News',
      page: 'Web Pages'
    }
  }

  get tabsComponent () {
    const BASE = './ContentTabs/'
    return {
      product: BASE.concat('Products'),
      technical_info: BASE.concat('TechnicalInfo'),
      literature: BASE.concat('Literature'),
      news: BASE.concat('News'),
      page: BASE.concat('Default')
    }
  }

  onPageLoaded (data: ChildFunctionArgs) {
    console.log(data)
  }

  componentDidMount () {
    const Tabs = this.tabsComponent
    const components = {}

    Object.keys(Tabs).forEach(tab => {
      components[tab] = Loadable({
        loader: () => import(`${Tabs[tab]}`),
        loading: Loading
      })
    })

    this.getResultsCount()
    this.setState({ components })
  }

  handleChangeOptionSelect (event: SyntheticInputEvent<HTMLSelectElement>) {
    console.log(event)
  }

  handleChangeTab (selected: string) {
    this.setState({ selected })
  }

  renderOptionsMobile () {
    const defaultOption = this.state.selected
    return (
      <div className={`${style.mobileSelectWtapper}`}>
        <BCorpSelectField
          filterState={''}
          defaultOptionId={0}
          options={this.getTabs}
          className={`col1 col2-tablet`}
          defaultOptionName={defaultOption}
          handleChange={this.handleChangeOptionSelect.bind(this)}
        />
      </div>
    )
  }

  renderOptions () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.resultsHeaderContainer
        }`}>
        <ul className={`${style.resultsOptionsWrapper}`}>
          {Object.keys(this.getTabs).map((tab, index) => {
            return (
              <li
                className={tab === this.state.selected ? 'selected' : ''}
                key={index}>
                <a
                  onClick={() => {
                    this.handleChangeTab(tab)
                  }}>
                  {this.getTabs[tab]}{' '}
                  {tab in this.state.resultCount
                    ? `(${this.state.resultCount[tab].toString()})`
                    : '(0)'}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderHeader () {
    const query = this.props.match.params.query
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.resultsHeaderContainer
        }`}>
        <div className={`${style.resultsSummary}`}>
          <p>{`You searched for "${query}" - 613 Results`}</p>
        </div>
        {renderTitle('Search Results', 'col1')}
      </div>
    )
  }

  renderTabs () {
    return (
      <div className={`${style.itemsWrapper}`}>
        <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
          {match =>
            match
              ? this.renderOptionsMobile() // mobile
              : this.renderOptions()
          }
        </Media>
      </div>
    )
  }

  wrapComponent (ResultComponent, postType: string) {
    return React.createElement(
      LoadMore,
      {
        getPosts: (args: GetPostsArgs) => {
          return this.getResultsByTab(args, postType)
        },
        postsPerPage: 20,
        onPageLoaded: (data: ChildFunctionArgs) => {
          this.onPageLoaded(data)
        },
        onRequestFail: (error: Error) => {
          if (!(postType in this.state.results)) {
            this.setState({
              results: Object.assign({}, this.state.results, {
                [postType]: []
              })
            })
          }
        }
      },
      (data: ChildFunctionArgs) => {
        return (
          <ResultComponent
            {...data}
            shouldReset={!(postType in this.state.results)}
          />
        )
      }
    )
  }

  renderResults () {
    const postType = this.state.selected
    const SearchComponent = this.state.components[postType]
    return SearchComponent
      ? this.wrapComponent(SearchComponent, postType)
      : null
  }

  async getResultsCount () {
    const url = `${api.baseURL}search`
    const params = {
      keywords: encodeURIComponent(this.props.match.params.query),
      numbers_only: 'true'
    }
    const response = await axios.get(url, { params })

    this.setState({ resultCount: response.data })
  }

  getResultsByTab (
    { postsPerPage, paged, offset }: GetPostsArgs,
    postType: string
  ) {
    return SearchClient.getSearchResults(
      this.props.match.params.query,
      postType,
      postsPerPage,
      paged,
      offset
    ).then(response => {
      this.setState({
        results: Object.assign({}, this.state.results, {
          [postType]: response.data
        })
      })
      return response
    })
  }

  render () {
    return (
      <div>
        {this.renderHeader()}
        <div className={`${style.itemsWrapper}`}>{this.renderTabs()}</div>
        <div
          className={`row ${defaultStyle.defaultTemplate} ${
            style.contentWrapper
          }`}>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}
