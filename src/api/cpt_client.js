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

  get (page = 1) {
    const args = {
      'post_type': this.cptName,
      'paged': page
    }

    return api.query({ args })
  }
}

export default CPTApiClient
