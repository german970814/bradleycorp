// @flow
import * as React from 'react'
import type { BCorpPost } from '../../../../lib/types/post_types'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../lib/containers/LoadMore/LoadMore'
import type { Location, Match } from 'react-router-dom'
import type { PostType } from '../../../../lib/types/cpt_types'
import axios from 'axios'
import Media from 'react-media'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import BCorpSelectField from '../../../../lib/components/BCorpFilterField/BCorpSelectField'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import api from './../../../../api/index'
import SearchClient from './../../../../api/search_client'
import LoadMore from '../../../../lib/containers/LoadMore/LoadMore'
import DefaultResults from './ContentTabs/Default'
import LiteratureResults from './ContentTabs/Literature'
import NewsResults from './ContentTabs/News'
import ProductsResults from './ContentTabs/Products'
import TechnicalInfoResults from './ContentTabs/TechnicalInfo'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import style from './Results.scss'

type TabOption =
  | (PostType & 'product')
  | 'literature'
  | 'technical_info'
  | 'news'
  | 'page'

type Props = {
  location: Location,
  match: { params: { query: string } } & Match
}

type State = {
  selected: TabOption,
  resultCount: {
    [string]: number
  },
  results: {
    [string: TabOption]: Array<BCorpPost>
  }
}

export default class Results extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      selected: 'product',
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

  onPageLoaded (data: ChildFunctionArgs) {
    console.log(data)
  }

  componentDidMount () {
    this.getResultsCount()
  }

  handleChangeOptionSelect (event: SyntheticInputEvent<HTMLSelectElement>) {
    console.log(event)
  }

  handleChangeTab (selected: TabOption) {
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
                className={tab === this.state.selected ? `${style.selected}` : ''}
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

  renderResults () {
    const { selected } = this.state
    return (
      <div className={style[selected]}>
        <LoadMore
          posts={this.state.results[selected]}
          getPosts={(args: GetPostsArgs) => {
            return this.getResultsByTab(args)
          }}
          postsPerPage={20}>
          {(args: ChildFunctionArgs) => {
            return this.renderResultsComponent(selected, args)
          }}
        </LoadMore>
      </div>
    )
  }

  canLoadMore(selected: TabOption) {
    return selected in this.state.results ?
      this.state.resultCount[selected] > this.state.results[selected].length : false
  }

  renderResultsComponent (selected: TabOption, args: ChildFunctionArgs): React.Node {
    args = { ...args, shouldReset: false, canLoadMore: this.canLoadMore(selected) }
    switch (selected) {
      case 'product':
        return <ProductsResults {...args} />
      case 'literature':
        return <LiteratureResults {...args} />
      case 'technical_info':
        return <TechnicalInfoResults {...args} />
      case 'news':
        return <NewsResults {...args} />
      default:
        return <DefaultResults {...args} />
    }
  }

  async getResultsCount (): Promise<void> {
    try {
      const response = await SearchClient.getSearchNumberOfResults(
        this.props.match.params.query
      )
      this.setState({ resultCount: response.data })
    } catch (error) {
      console.log(error)
    }
  }

  async getResultsByTab ({
    postsPerPage,
    paged,
    offset
  }: GetPostsArgs): Promise<void> {
    try {
      const response = await SearchClient.getSearchResults(
        this.props.match.params.query, this.state.selected,
        postsPerPage, paged, offset
      )
      const results = {
        ...this.state.results,
        [this.state.selected]: response.data
      }
      this.setState({ ...this.state, results })
    } catch (error) {
      console.log(error)
    }
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
