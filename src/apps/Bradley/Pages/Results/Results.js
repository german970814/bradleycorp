// @flow
import * as React from 'react'
import Media from 'react-media'
import style from './Results.scss'
import type { Location, Match, History } from 'react-router-dom'
import SearchClient from './../../../../api/search_client'
import type { PostType } from '../../../../lib/types/cpt_types'
import Loading from '../../../../lib/components/Loading/Loading'
import type { BCorpPost } from '../../../../lib/types/post_types'
import LoadMore from '../../../../lib/containers/LoadMore/LoadMore'
import { MOBILEMAXWIDTH, TABLETMAXWIDTH } from '../../../../globals'
import defaultStyle from '../../../../lib/containers/Templates/Templates.scss'
import BCorpSelectField from '../../../../lib/components/BCorpFilterField/BCorpSelectField'
import { renderTitle } from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import type {
  ChildFunctionArgs,
  GetPostsArgs,
  GetPostsFunctionType
} from '../../../../lib/containers/LoadMore/LoadMore'
import {
  SearchDefault,
  SearchLiterature,
  SearchNews,
  SearchProduct,
  SearchTechnicalIfo
} from './ContentTabs'


type TabOption =
  | (PostType & 'product')
  | 'literature'
  | 'technical_info'
  | 'news'
  | 'page'

type Tab = {
  [TabOption]: string
}

type Props = {
  location: Location,
  match: { params: { query: string, tab: TabOption } } & Match,
  history: History
}

type State = {
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
      resultCount: {},
      results: {}
    }
  }

  get getTabs (): Tab {
    return {
      product: 'Products',
      literature: 'Literature',
      technical_info: 'Technical Info',
      news: 'In The News',
      page: 'Web Pages'
    }
  }

  get activeTab() {
    return this.props.match.params.tab
  }

  onPageLoaded (data: ChildFunctionArgs) {
    console.log(data)
  }

  componentDidMount () {
    this.getResultsCount()
  }

  handleChangeOptionSelect (event: SyntheticInputEvent<HTMLSelectElement>) {
    this.handleChangeTab(event.target.value)
  }

  handleChangeTab (selected: TabOption) {
    const regex = /\/(product|literature|technical_info|news|pages)\/?/g
    // console.log(this.props.match.url.replace(regex, `/${selected}/`))
    this.props.history.push(this.props.match.url.replace(regex, `/${selected}/`))
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (prevProps.match.params.tab !== this.props.match.params.tab) {

    }
  }

  renderOptionsMobile () {
    const defaultOption = this.getTabs[this.activeTab]
    return (
      <div className={`${style.mobileSelectWtapper}`}>
        <BCorpSelectField
          filterState={''}
          defaultOptionId={0}
          options={this.getTabs}
          className={`col1 col2-tablet`}
          defaultOptionName={''}
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
            const count = this.state.resultCount[tab]
            return count ? (
              <li
                className={tab === this.activeTab ? `${style.selected}` : ''}
                key={index}>
                <a
                  onClick={() => {
                    this.handleChangeTab(tab)
                  }}>
                  {`${this.getTabs[tab]} (${count.toString()})`}
                </a>
              </li>
            ) : null
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
          <p>{`You searched for "${query}" - ${this.getTotalResults()} Results`}</p>
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
    const selected = this.activeTab
    return selected ? <div className={style[selected]}>
      <LoadMore
        posts={this.state.results[selected]}
        getPosts={(args: GetPostsArgs) => {
          return this.getResultsByTab(args)
        }}
        postsPerPage={20}>
        {(args: ChildFunctionArgs) => {
          return this.renderResultsComponent(args)
        }}
      </LoadMore>
    </div> : <Loading />
  }

  getTotalResults(): number {
    return Object.keys(this.getTabs).map(postType => {
      return postType in this.state.resultCount ? this.state.resultCount[postType] : 0
    }).reduce((first, second) => { return first + second })
  }

  canLoadMore(selected: TabOption) {
    return selected in this.state.results ?
      this.state.resultCount[selected] > this.state.results[selected].length : false
  }

  renderResultsComponent (args: ChildFunctionArgs): React.Node {
    args = { ...args, shouldReset: false, canLoadMore: this.canLoadMore(this.activeTab) }
    switch (this.activeTab) {
      case 'product':
        return <SearchProduct {...args} />
      case 'literature':
        return <SearchLiterature {...args} />
      case 'technical_info':
        return <SearchTechnicalIfo {...args} />
      case 'news':
        return <SearchNews {...args} />
      default:
        return <SearchDefault {...args} />
    }
  }

  async getResultsCount (): Promise<void> {
    try {
      const response = await SearchClient.getSearchNumberOfResults(
        this.props.match.params.query
      )
      this.setState({ resultCount: response.data })

      if (this.activeTab && this.activeTab in response.data && response.data[this.activeTab] < 1) {
        for (let tab in this.getTabs) {
          if (response.data[tab] >= 1) {
            this.handleChangeTab(tab)
          }
        }
      } else if (!this.activeTab) {
        for (let tab in this.getTabs) {
          if (tab in response.data && response.data[tab] >= 1) {
            this.props.history.push(this.props.match.url.concat(`/${tab}`))
            break
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getResultsByTab ({
    postsPerPage,
    paged,
    offset
  }: GetPostsArgs): Promise<void> {
    const activeTab = this.activeTab
    try {  // TODO: Traer datos paginados, tener en cuenta los anteriores
      const response = await SearchClient.getSearchResults(
        this.props.match.params.query, activeTab,
        postsPerPage, paged, offset
      )
      const results = {
        ...this.state.results,
        [activeTab]: response.data
      }
      this.setState({ ...this.state, results })
    } catch (error) {
      if (!Array.isArray(this.state.results[activeTab])) {
        const results = {
          ...this.state.results,
          [activeTab]: []
        }
        this.setState({ ...this.state, results })
      }
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
