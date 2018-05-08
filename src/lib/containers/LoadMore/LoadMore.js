// @flow
import * as React from 'react'
import type { AxiosPromise } from 'axios'
import type { BCorpPost } from '../../types/post_types'
import debounce from 'debounce'
import Loading from '../../components/Loading/Loading'

// will need to pass it a function which deconstructs the
// postsPerPage and paged object and passes it to an actual
// function from the api client along with any other necessary arguments.
//
// This component is only designed to handle the pagination
type GetPostsArgs = {
  postsPerPage: number,
  paged: number
}

type GetPostsFunctionType = GetPostsArgs => AxiosPromise<Array<BCorpPost>>

// what the child render method gets passed
type ChildFunctionArgs = {
  posts: Array<BCorpPost>,
  postsPerPage: number,
  paged: number,
  canLoadMore: boolean,
  loadNextPage: () => void,
  reset: () => void
}

type GetPageFunctionType = (paged: number) => void

// what we need to pass
type Props = {
  children: ChildFunctionArgs => React.Node,
  postsPerPage: number,
  getPosts: GetPostsFunctionType
}

type State = {
  posts?: Array<BCorpPost>,
  loading: boolean,
  paged: number
}

class LoadMore extends React.Component<Props, State> {
  // we need this function twice
  // otherwise when fetching new posts on reset
  // it would only send the request for the second page
  // since the request for the second page would debounce the first
  getPageDebounced: GetPageFunctionType
  getPageDebouncedNext: GetPageFunctionType

  constructor (props: Props) {
    super(props)

    this.state = { loading: true, paged: 1 }

    this.getPageDebounced = debounce(this.getPage, 1500)
    this.getPageDebouncedNext = debounce(this.getPage, 2000)
  }

  componentDidMount () {
    this.getPage(1)
    this.getPageDebounced(2)
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    // if we 'load more' we need to request the next page
    if (prevState.paged !== this.state.paged) {
      this.getPage(this.state.paged + 1)
    }
  }

  reset () {
    this.setState({ loading: true, paged: 1, posts: undefined })
    this.getPage(1)
    this.getPageDebouncedNext(2)
  }

  loadNextPage () {
    if (this.canLoadMore()) {
      const paged: number = this.state.paged + 1
      return this.setState({ paged })
    }
  }

  render () {
    console.log(this.state)
    return this.state.loading ? (
      <Loading />
    ) : (
      this.props.children({
        posts: this.state.posts || [],
        postsPerPage: this.props.postsPerPage,
        paged: this.state.paged,
        canLoadMore: this.canLoadMore(),
        loadNextPage: this.loadNextPage.bind(this),
        reset: this.reset.bind(this)
      })
    )
  }

  async getPage (paged: number) {
    try {
      console.log('sending', paged)

      const args = {
        postsPerPage: this.props.postsPerPage,
        paged
      }
      const response = await this.props.getPosts(args)

      let posts: Array<BCorpPost> = response.data

      console.log(`got ${posts.length} posts`, paged)

      const prevPosts = this.state.posts || []
      posts = [...prevPosts, ...posts]

      return this.setState({ posts, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  canLoadMore (): boolean {
    return !!(
      !this.state.loading &&
      this.state.posts &&
      this.state.posts.length > this.props.postsPerPage * this.state.paged
    )
  }
}

export default LoadMore
export type { GetPostsArgs, GetPostsFunctionType, ChildFunctionArgs }
