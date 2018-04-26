// @flow
import axios from 'axios'
import api from './index'
import CPTApiClient from './cpt_client'

class ProductApiClient extends CPTApiClient {
  constructor () {
    super('product')
  }

  getTabs (sku: string) {
    const url = `${api.baseURL}product/tabs`
    const params = { sku }

    return axios.get(url, { params })
  }

  getProductDetailPage (slug: string) {
    const url = `${api.baseURL}page/product-detail`
    const params = { slug }

    return axios.get(url, { params })
  }
}

export default ProductApiClient
