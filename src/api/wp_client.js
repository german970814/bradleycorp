// @flow
import type { WPCreateComment, WPComment } from '../lib/types/comment_types'
import type { AxiosPromise } from 'axios'
import axios from 'axios'
import api from './index'

/**
 * API Client for using the default WP REST API
 */

const WPAPIClient = {
  /**
   * GET
   */

  getComments (post: number): AxiosPromise<Array<WPComment>> {
    const url = `${api.baseURLWPDefaultAPI}comments`
    const params = { post }

    return axios.get(url, { params })
  },

  /**
   * POST
   */

  postNewComment (params: WPCreateComment) {
    const url = `${api.baseURLWPDefaultAPI}comments`

    console.log(url)

    return axios.post(url, { params })
  }
}

export default WPAPIClient
