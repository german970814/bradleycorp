// @flow
import type { CPTName } from '../lib/types/cpt_types'
import type { AxiosPromise } from 'axios'
import type { BCorpPost } from '../lib/types/post_types'
import type { DateQuery } from '../lib/types/query_types'
import axios from 'axios'
import api from './index'

/**
 * This is the object shape that our function getByTaxNameAndTermSlugObject requires.
 *
 * Note, it will always have a tax name (string) as key,
 * and an array of tax slugs (Array<string>) as values.
 * BUT, we've allowed the object to be empty for getting all posts.
 */
type TaxAndTermSlugObject = {
  [string]: ?Array<string>
}

/**
 * A recursive object structure that will let us nest tax queries
 * to let us get posts using more complex combinations of taxonomies and terms
 *
 * This is not the actual object structure used by Wordpress,
 * but it is translated in the backend
 */
type NestedTaxQuery = {
  relation: 'OR' | 'AND',
  queries: Array<
    | {
        tax: string,
        slugs: Array<string>
      }
    | NestedTaxQuery
  >
};

type Response = AxiosPromise<Array<BCorpPost>>

type FoundPostsResponse = AxiosPromise<{
  posts: Array<BCorpPost>,
  found_posts: number
}>;

class CPTApiClient {
  cptName: CPTName

  constructor (cptName: CPTName) {
    this.cptName = cptName
  }

  /* GET posts */

  getLatest (
    numberPosts: number = 0,
    paged?: number,
    offset?: number,
    dateQuery?: DateQuery,
    keywords?: string,
    foundPosts?: boolean
  ): AxiosPromise<Array<BCorpPost>> {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      posts_per_page: numberPosts,
      paged,
      offset,
      date_query: dateQuery,
      keywords: encodeURIComponent(keywords || '')
    }

    return axios.get(url, { params })
  }

  getById (id: number): AxiosPromise<BCorpPost> {
    const url = `${api.baseURL}${this.cptName}`
    const params = { id }

    return axios.get(url, { params })
  }

  getBySlug (slug: string): AxiosPromise<BCorpPost> {
    const url = `${api.baseURL}${this.cptName}`
    const params = { slug }

    return axios.get(url, { params })
  }

  getByIdArray (
    idArray: Array<number>,
    postsPerPage?: number
  ): AxiosPromise<Array<BCorpPost>> {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      id_array: JSON.stringify(idArray),
      posts_per_page: postsPerPage,
    }
    return axios.get(url, { params })
  }

  getByTax (
    taxName: string,
    termSlug: string,
    postsPerPage?: number,
    paged?: number,
    offset?: number,
    dateQuery?: DateQuery,
    keywords?: string,
    // note: this changes the response shape
    foundPosts?: boolean
  ): * {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      tax_name: taxName,
      term_slug: termSlug,
      posts_per_page: postsPerPage,
      paged,
      offset,
      date_query: dateQuery,
      keywords: encodeURIComponent(keywords || '')
    }

    // let flow imply the response shape
    const request: Response = axios.get(url, { params })
    const requestFoundPosts: FoundPostsResponse = axios.get(url, { params })

    return foundPosts ? requestFoundPosts : request
  }

  getByTaxAndTermArray (
    taxName: string,
    termSlugArray: Array<string>,
    postsPerPage?: number,
    paged?: number,
    offset?: number,
    dateQuery?: DateQuery,
    keywords?: string,
    // note: this changes the response shape
    foundPosts?: boolean
  ): * {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      tax_name: taxName,
      term_slug_array: JSON.stringify(termSlugArray),
      posts_per_page: postsPerPage,
      paged,
      offset,
      date_query: dateQuery,
      keywords: encodeURIComponent(keywords || '')
    }

    // let flow imply the response shape
    const request: Response = axios.get(url, { params })
    const requestFoundPosts: FoundPostsResponse = axios.get(url, { params })

    return foundPosts ? requestFoundPosts : request
  }

  getByTaxNameAndTermSlugObject (
    taxNameAndTermSlugObject: TaxAndTermSlugObject,
    relation: 'AND' | 'OR',
    postsPerPage?: number,
    paged?: number,
    offset?: number,
    dateQuery?: DateQuery,
    keywords?: string,
    // note: this changes the response shape
    foundPosts?: boolean
  ): * {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      tax_name_term_slug_array: encodeURIComponent(
        JSON.stringify(taxNameAndTermSlugObject)
      ),
      relation,
      posts_per_page: postsPerPage,
      paged,
      offset,
      date_query: dateQuery,
      keywords: encodeURIComponent(keywords || '')
    }

    // let flow imply the response shape
    const request: Response = axios.get(url, { params })
    const requestFoundPosts: FoundPostsResponse = axios.get(url, { params })

    return foundPosts ? requestFoundPosts : request
  }

  getByNestedTaxQuery (
    nestedTaxQuery: NestedTaxQuery,
    postsPerPage?: number,
    paged?: number,
    offset?: number,
    dateQuery?: DateQuery,
    keywords?: string,
    // note: this changes the response shape
    foundPosts?: boolean
  ): * {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      nested_tax_query: encodeURIComponent(JSON.stringify(nestedTaxQuery)),
      posts_per_page: postsPerPage,
      paged,
      offset,
      date_query: dateQuery,
      keywords: encodeURIComponent(keywords || ''),
      found_posts: foundPosts
    }

    // let flow imply the response shape
    const request: Response = axios.get(url, { params })
    const requestFoundPosts: FoundPostsResponse = axios.get(url, { params })

    return foundPosts ? requestFoundPosts : request
  }

  /* GET Terms */

  getTerms () {
    const url = `${api.baseURL}${this.cptName}-terms`

    return axios.get(url)
  }

  getTermsByTax (taxName: string) {
    const url = `${api.baseURL}${this.cptName}-terms`
    const params = { 'tax-name': taxName }

    return axios.get(url, { params })
  }

  /* GET Child/Parent Trees */

  getHeirarchyById (id: number) {
    const url = `${api.baseURL}${this.cptName}-heirarchy`
    const params = { id }

    return axios.get(url, { params })
  }

  getTreeById (id: number) {
    const url = `${api.baseURL}${this.cptName}-tree`
    const params = { id }

    return axios.get(url, { params })
  }

  /* Extras //TODO: remove */

  get (page: number = 1) {
    const args = {
      post_type: this.cptName,
      paged: page
    }

    return api.query({ args })
  }
}

export default CPTApiClient
export type { TaxAndTermSlugObject }
