// @flow
import type { CPTName } from '../lib/types/cpt_types'
import axios from 'axios'
import api from './index'

class CPTApiClient {
  cptName: CPTName

  constructor (cptName: CPTName) {
    this.cptName = cptName
  }

  /* GET posts */

  getLatest (numberPosts: number = 0) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { posts_per_page: numberPosts }

    return axios.get(url, { params })
  }

  getById (id: number) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { id }

    return axios.get(url, { params })
  }

  getBySlug (slug: string) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { slug }

    return axios.get(url, { params })
  }

  getByIdArray (idArray: Array<number>, postsPerPage: number = 10) {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      id_array: JSON.stringify(idArray),
      posts_per_page: postsPerPage
    }

    return axios.get(url, { params })
  }

  getByTax (taxName: string, termSlug: string) {
    const url = `${api.baseURL}${this.cptName}`
    const params = { tax_name: taxName, term_slug: termSlug }

    return axios.get(url, { params })
  }

  getByTaxAndTermArray (taxName: string, termSlugArray: Array<string>) {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      tax_name: taxName,
      term_slug_array: JSON.stringify(termSlugArray)
    }

    return axios.get(url, { params })
  }

  getByTaxNameAndTermSlugObject (
    taxNameAndTermSlugObject: {
      [string]: Array<string>
    },
    relation: 'AND' | 'OR'
  ) {
    const url = `${api.baseURL}${this.cptName}`
    const params = {
      tax_name_term_slug_array: encodeURIComponent(
        JSON.stringify(taxNameAndTermSlugObject)
      ),
      relation
    }

    return axios.get(url, { params })
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
