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

  getByIdArray (idArray, postsPerPage = 10) {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      id_array: JSON.stringify(idArray),
      posts_per_page: postsPerPage
    }

    return axios.get(url, { params })
  }

  getByTax (taxName, termSlug) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { tax_name: taxName, term_slug: termSlug }

    return axios.get(url, { params })
  }

  getByTaxAndTermArray (taxName, termSlugArray) {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      tax_name: taxName,
      term_slug_array: JSON.stringify(termSlugArray)
    }

    return axios.get(url, { params })
  }

  getHeirarchyById (id) {
    const url = `${api.baseURL}${this.cptName}-heirarchy`
    const params = { id }

    return axios.get(url, { params })
  }

  get (page = 1) {
    const args = {
      post_type: this.cptName,
      paged: page
    }

    return api.query({ args })
  }

  getTerms () {
    const url = `${api.baseURL}${this.cptName}-terms`

    return api.get(url)
  }
}

export default CPTApiClient
