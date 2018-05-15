// @flow
import type { AxiosPromise } from 'axios'
import type { BCorpPost } from '../lib/types/post_types'
import type { DateQuery } from '../lib/types/query_types'
import axios from 'axios'
import api from './index'

/**
 * Used for the site's search functionality
 */
const SearchClient = {
  getSearchResults (
    keywords: string,
    postType?: string,
    postsPerPage?: number,
    paged?: number,
    offset?: number,
    dateQuery?: DateQuery
  ): AxiosPromise<Array<BCorpPost>> {
    const url = `${api.baseURL}search`
    const params = {
      keywords: encodeURIComponent(keywords || ''),
      post_type: postType,
      posts_per_page: postsPerPage,
      paged,
      offset,
      date_query: dateQuery
    }

    return axios.get(url, { params })
  },

  getSearchNumberOfResults (
    keywords: string,
    postType?: string,
    dateQuery?: DateQuery
  ): AxiosPromise<Array<BCorpPost>> {
    const url = `${api.baseURL}search`
    const params = {
      keywords: encodeURIComponent(keywords || ''),
      numbers_only: true,
      post_type: postType,
      date_query: dateQuery
    }

    return axios.get(url, { params })
  }
}

export default SearchClient
