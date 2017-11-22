import axios from 'axios'
import api from './index'

class CPTApiClient {
  constructor (cptName) {
    this.cptName = cptName
  }

  getById (id) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { id }

    return axios.get(url, { params })
  }

  getBySlug (slug) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { slug }

    return axios.get(url, { params })
  }

  get (page = 1) {
    const args = {
      'post_type': this.cptName,
      'paged': page
    }

    return api.query({ args })
  }

  getTerms () {
    const url = `${api.baseURL}${this.cptName}-terms`

    return api.get(url)
  }
}

export default CPTApiClient
