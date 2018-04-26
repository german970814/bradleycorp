// @flow
import axios from 'axios'
import api from './index'

class CustomPageApiClient {
  getBySlug (slug: string) {
    const url = `${api.baseURL}page/custom-page`
    const params = { slug }

    return axios.get(url, { params })
  }

  getByPath (path: string) {
    const url = `${api.baseURL}page/custom-page`
    const params = { path: encodeURIComponent(path) }

    return axios.get(url, { params })
  }
}

export default CustomPageApiClient
