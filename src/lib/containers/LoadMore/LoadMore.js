// @flow
import * as React from 'react'
import type { AxiosPromise } from 'axios'
import type { BCorpPost } from '../../types/post_types'
import type { Match, RouterHistory } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import debounce from 'debounce'
import { getUrlWithoutPageParam } from '../../../lib/bcorpUrl'
import Loading from '../../components/Loading/Loading'

// will need to pass LoadMore a function which deconstructs the
// postsPerPage and paged object and passes it to an actual
// function from the api client along with any other necessary arguments.
//
// This component is only designed to handle the pagination
// so we need to give it the function it will use to make the request
type GetPostsArgs = {
  postsPerPage: number,
  paged: number,
  offset?: number
}

type GetPostsFunctionType = GetPostsArgs => AxiosPromise<Array<BCorpPost>>

// what the child render method gets passed
type ChildFunctionArgs = {
  posts: Array<BCorpPost>,
  postsPerPage: number,
  paged: number,
  offset: number,
  canLoadMore: boolean,
  shouldDisplayPost: (index: number) => boolean,
  loadNextPage: () => void,
  reset: () => void
}

type Props = {
  // what we need to pass
  children: ChildFunctionArgs => React.Node,
  postsPerPage: number,
  getPosts: GetPostsFunctionType,
  // passed by withRouter HOC
  match: Match,
  history: RouterHistory,
  posts: Array<BCorpPost>,
  paged: number
}

type State = {
  posts?: Array<BCorpPost>,
  loading: boolean,
  paged: number,
  offset: number
}

type GetPageFunctionType = (
  postsPerPage: number,
  paged: number,
  offset: number
) => void

/**
 *
 * This component controls pagination
 * and can be applied to any page/component which deals with an array of posts.
 *
 * To use it, pass it a function as children
 * which accepts the ChildFunctionArgs (above) object as an argument.
 *
 * Using those passed variables and methods you will have everything you need
 * to control the pagination and render the resulting posts
 *
 * This component keeps track of the current page in the url.
 * Refreshing or entering at a certain page number will render all the posts
 * that appear on pages up to and including that one.
 * Any requests for further pages will paginate from there with the usual postsPerPage
 *
 * The component will always request the next page in the background
 * ready for the user deciding to load more.
 * This will make it seem instantaneous to load more posts.
 * You have a boolean 'canLoadMore' passed to the child
 * so you can know when you should or shouldnt hide the load more button
 * and a shouldDisplayPost method (which takes an index) to make it easier
 * to know which posts to render.
 *
 * NOTE: Bit of an annoying quirk.
 * The paged state tracks behind by 1 when we have an offset.
 * Without an offset, the paged state corresponds to the page that's being shown,
 * but with an offset, it corresponds to how many new pages we've requested
 * (after the first).
 * It's because the first request doesnt technically count as a page
 * since we're getting all posts up to the current page.
 *
 */
class LoadMoreWithRouter extends React.Component<Props, State> {
  // we need this function twice
  // otherwise when fetching new posts on reset
  // it would only send the request for the second page
  // since the request for the second page would debounce the first
  getPageDebounced: GetPageFunctionType
  getPageDebouncedNext: GetPageFunctionType

  constructor (props: Props) {
    super(props)

    // the offset can be seen as the number of posts we will get in the initial request
    // effectively our 0 point
    //
    // any requests after that are paginated, the first one being page 1
    // this is why the paged state tracks behind by 1 when we have an offset
    const initOffset =
      parseInt(this.props.match.params.page) * this.props.postsPerPage || 0

    const initPaged = initOffset === 0 ? 1 : 0

    this.state = { loading: true, paged: initPaged, offset: initOffset }

    this.getPageDebounced = debounce(this.getPage, 1500)
    this.getPageDebouncedNext = debounce(this.getPage, 2000)
  }

  componentDidMount () {
    if (this.state.offset && this.state.offset !== 0) {
      // posts are being requested for a page other than the first one
      // so we need to get all posts up until that point
      //
      // passing the initial offset as the postsPerPage
      // and the offset as 0 will get us all the posts up to the offset
      this.getPage(this.state.offset, 1, 0)
      // then we want to get what would effectively be the first page
      // using our actual postsPerPage, paged, and offset params.
      this.getPageDebounced(this.props.postsPerPage, 1, this.state.offset)
    } else if (!this.props.posts) {
      // if there's no offset then we proceed as normal
      // just getting the first and second pages from 0
      this.getPage(this.props.postsPerPage, 1, this.state.offset)
      this.getPageDebounced(this.props.postsPerPage, 2, this.state.offset)
    }
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    // if we 'load more' we need to request the next page
    if (prevState.paged !== this.state.paged) {
      this.getPage(
        this.props.postsPerPage,
        this.state.paged + 1,
        this.state.offset
      )

      // we keep track of the page state in the url
      // in case they refresh teh page we can continue from the same point
      const page =
        this.state.offset !== 0
          ? parseInt(this.props.match.params.page) + 1
          : this.state.paged

      // replace any old page parameters then re add them
      let newUrl = getUrlWithoutPageParam(this.props.match)
      newUrl = `${newUrl}/page=${page}`

      this.props.history.push(newUrl)
    }
  }

  reset () {
    // we can run this function to start everything again from 0
    //
    // ie if we change filters and need completely new posts
    //
    // we also reset the url and remove page=
    this.setState({ loading: true, paged: 1, posts: undefined, offset: 0 })
    this.props.history.push(this.props.match.url.replace(/\/page=\d*/g, ''))

    this.getPage(this.props.postsPerPage, 1, this.state.offset)
    this.getPageDebouncedNext(this.props.postsPerPage, 2, this.state.offset)
  }

  loadNextPage () {
    if (this.canLoadMore()) {
      const paged = (this.props.paged || this.state.paged) + 1
      return this.setState({ paged })
    }
  }

  render () {
    // console.log(this.state)
    return (this.state.loading) ? (
      <Loading />
    ) : (
      this.props.children({
        posts: this.state.posts,
        postsPerPage: this.props.postsPerPage,
        paged: this.state.paged,
        offset: this.state.offset,
        canLoadMore: this.canLoadMore(),
        shouldDisplayPost: this.shouldDisplayPost.bind(this),
        loadNextPage: this.loadNextPage.bind(this),
        reset: this.reset.bind(this)
      })
    )
  }

  async getPage (postsPerPage: number, paged: number, offset: number) {
    try {
      // console.log('sending', {
      //   postsPerPage,
      //   paged,
      //   offset
      // })

      const args = {
        postsPerPage,
        paged,
        offset
      }
      const response = await this.props.getPosts(args)

      let posts: Array<BCorpPost> = response.data

      // console.log(`got ${posts.length} posts`, paged)

      const prevPosts = this.state.posts || []
      posts = [...prevPosts, ...posts]

      this.setState({ posts, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  canLoadMore (): boolean {
    return !!(
      !this.state.loading &&
      this.state.posts &&
      this.state.posts.length >
        this.props.postsPerPage * this.state.paged + this.state.offset
    )
  }

  shouldDisplayPost (index: number): boolean {
    return (
      index < this.props.postsPerPage * this.state.paged + this.state.offset
    )
  }
}

const LoadMore = withRouter(LoadMoreWithRouter)

export default LoadMore
export type { GetPostsArgs, GetPostsFunctionType, ChildFunctionArgs }
