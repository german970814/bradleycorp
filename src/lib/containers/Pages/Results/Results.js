// @flow
import * as React from 'react'
import type { Location, Match, RouterHistory } from 'react-router-dom'
import type { ScreenSize } from '../../../contexts/ScreenSizeContext'
import type { BCorpPost } from '../../../types/post_types'
import type { PostType } from '../../../types/cpt_types'
import type { ChildFunctionArgs, GetPostsArgs } from './LoadMore'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import { site } from '../../../../api'
import LoadMore from './LoadMore'
import style from './Results.scss'
import SearchClient from './../../../../api/search_client'

import Loading from '../../../components/Loading/Loading'
import BCorpHead from '../../../components/BCorpHead/BCorpHead'

import NoResults from '../../../components/Error404/NoResults/NoResults'
import defaultStyle from '../../../containers/Templates/Templates.scss'
import BCorpSelectField from '../../../components/BCorpFilterField/BCorpSelectField'
import { renderTitle } from '../../../containers/Templates/DefaultTemplate/DefaultTemplate'

import {
  SearchLiterature,
  SearchNews,
  SearchPost,
  SearchProduct,
  SearchTechnicalInfo,
  SearchPage
} from './ContentTabs'

type TabOption = 'page' | PostType

type Tab = {
  [TabOption]: string
}

type Props = {
  location: Location,
  match: { params: { query: string, tab: TabOption, page?: number } } & Match,
  history: RouterHistory,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  resultCount: {
    [string]: number
  },
  results: {
    [string: TabOption]: {
      data: Array<BCorpPost>,
      paged: number,
      offset: number
    }
  }
}

const pageTitle = 'Search Results'
const pageDescription = ''

const POSTS_PER_PAGE = 20

class Results extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      resultCount: {},
      results: {}
    }
  }

  get getTabs (): Tab {
    return site === 'bcorp'
      ? {
        product: 'Products',
        literature: 'Literature',
        technical_info: 'Technical Info',
        news: 'In The News',
        page: 'Web Pages'
      }
      : {
        post: 'Posts'
      }
  }

  get activeTab (): TabOption {
    return this.props.match.params.tab
  }

  getPosts (postType: ?TabOption): ?Array<BCorpPost> {
    if (postType && postType in this.state.results) {
      const data = this.state.results[postType].data
      return data.slice(0, POSTS_PER_PAGE * this.state.results[postType].paged)
    }
    return undefined
  }

  componentDidMount () {
    this.getResultsCount()
  }

  handleChangeOptionSelect (event: SyntheticInputEvent<HTMLSelectElement>) {
    this.handleChangeTab(event.target.value)
  }

  handleChangeTab (selected: TabOption) {
    const regex = /\/((product|literature|technical_info|news|page)\/?)$/g
    const paged =
      selected in this.state.results ? this.state.results[selected].paged : null
    let url = this.props.match.url
      .replace(regex, `/${selected}/`)
      .replace(/\/page=\d*/g, '')
    if (paged && paged > 1) {
      const toConcat = `page=${paged}`
      url = url.endsWith('/')
        ? url.concat(toConcat)
        : url.concat(`/${toConcat}`)
    }
    this.props.history.push(url)
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (prevProps.match.params.query !== this.props.match.params.query) {
      this.setState({ results: {} }, () => {
        this.getResultsCount()
      })
    }
  }

  renderOptionsMobile () {
    const options = {}
    const tabs = this.getTabs
    for (const tab in tabs) {
      const count = this.state.resultCount[tab] || 0
      if (count >= 1) {
        options[tab] = `${tabs[tab]} (${count})`
      }
    }
    return (
      <div className={`${style.mobileSelectWtapper}`}>
        <BCorpSelectField
          defaultOptionId={0}
          defaultOptionName={''}
          options={options}
          filterState={this.activeTab}
          className={`col1 col2-tablet`}
          handleChange={this.handleChangeOptionSelect.bind(this)}
          notShowDefault
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
          <p>{`You searched for "${query}" - ${this.getTotalResults() ||
            0} Results`}</p>
        </div>
        {renderTitle('Search Results', 'col1')}
      </div>
    )
  }

  renderTabs () {
    return (
      <div className={`${style.itemsWrapper}`}>
        {this.props.screenSize === 'mobile'
          ? this.renderOptionsMobile()
          : this.renderOptions()}
      </div>
    )
  }

  renderResults () {
    const selected = this.activeTab
    if (this.getTotalResults() === 0) {
      return <NoResults message={'No results match your search'} />
    }
    const loadMoreProps = {
      posts: this.getPosts(selected)
    }
    const page = parseInt(this.props.match.params.page || 1)
    return selected ? (
      <div className={style[selected]}>
        <LoadMore
          {...loadMoreProps}
          paged={page}
          offset={
            page > 1 && !(selected in this.state.results)
              ? page * POSTS_PER_PAGE
              : 0
          }
          omitDebounce
          getPosts={(args: GetPostsArgs) => {
            return this.getResultsByTab(args)
          }}
          postsPerPage={POSTS_PER_PAGE}>
          {(args: ChildFunctionArgs) => {
            return this.renderResultsComponent(args)
          }}
        </LoadMore>
      </div>
    ) : (
      <Loading />
    )
  }

  getTotalResults (): ?number {
    if (!Object.keys(this.state.resultCount).length) {
      return null
    }
    return Object.keys(this.getTabs)
      .map(postType => {
        return postType in this.state.resultCount
          ? this.state.resultCount[postType]
          : 0
      })
      .reduce((first, second) => {
        return first + second
      })
  }

  canLoadMore (selected: TabOption) {
    return selected in this.state.results
      ? this.state.resultCount[selected] >
          this.state.results[selected].data.length
      : false
  }

  renderResultsComponent (args: ChildFunctionArgs): ?React.Node {
    if (this.activeTab) {
      args = { ...args, canLoadMore: this.canLoadMore(this.activeTab) }
      switch (this.activeTab) {
        case 'product':
          return <SearchProduct {...args} />
        case 'literature':
          return <SearchLiterature {...args} />
        case 'technical_info':
          return <SearchTechnicalInfo {...args} />
        case 'news':
          return <SearchNews {...args} />
        case 'page':
          return <SearchPage {...args} />
        default:
          return <SearchPost {...args} />
      }
    }
  }

  async getResultsCount (): Promise<void> {
    try {
      const response = await SearchClient.getSearchNumberOfResults(
        this.props.match.params.query
      )
      this.setState({ resultCount: response.data })

      if (
        this.activeTab &&
        this.activeTab in response.data &&
        response.data[this.activeTab] < 1
      ) {
        for (const tab in this.getTabs) {
          if (response.data[tab] >= 1) {
            this.handleChangeTab(tab)
          }
        }
      } else if (!this.activeTab) {
        for (const tab in this.getTabs) {
          if (tab in response.data && response.data[tab] >= 1) {
            this.props.history.push(this.props.match.url.concat(`/${tab}`))
            break
          }
        }
      }
    } catch (error) {
      const resultCount = {}

      for (const tab in this.getTabs) {
        resultCount[tab] = 0
      }
      this.setState({ resultCount })
    }
  }

  async getResultsByTab ({
    postsPerPage,
    paged,
    offset
  }: GetPostsArgs): Promise<void> {
    const activeTab = this.activeTab
    try {
      const response = await SearchClient.getSearchResults(
        this.props.match.params.query,
        activeTab,
        postsPerPage,
        paged,
        offset
      )
      let data = response.data
      if (activeTab) {
        if (
          activeTab in this.state.results &&
          Array.isArray(this.state.results[activeTab].data)
        ) {
          data = [...this.state.results[activeTab].data, ...data]
        }
        const { page } = this.props.match.params
        if (page && page > 1) {
          paged = page
        }
        const results = {
          ...this.state.results,
          [activeTab]: { data, paged, offset }
        }
        this.setState((previousState, currentProps) => {
          return { ...previousState, results }
        })
      }
    } catch (error) {
      if (activeTab) {
        if (
          (activeTab in this.state.results &&
            !Array.isArray(this.state.results[activeTab].data)) ||
          !(activeTab in this.state.results)
        ) {
          const results = {
            ...this.state.results,
            [activeTab]: {
              data: [],
              paged,
              offset
            }
          }
          this.setState({ ...this.state, results })
        }
      }
      console.log(error)
    }
  }

  render () {
    return (
      <div>
        <BCorpHead title={pageTitle} description={pageDescription} />

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

export default withScreenSize(Results)
