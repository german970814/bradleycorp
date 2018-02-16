import axios from 'axios'
import api from './index'

class CustomPageApiClient {

  getBySlug (slug) {
    const url = `${api.baseURL}page/custom-page`
    const params = { slug }

    return axios.get(url, { params })
  }
}

export default CustomPageApiClient
