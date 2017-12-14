import axios from 'axios'
import api from './index'
import CPTApiClient from './cpt_client'

class ProductApiClient extends CPTApiClient {
  constructor () {
    super('product')
  }

  getTabs (sku) {
    const url = `${api.baseURL}product/tabs`
    const params = { sku }

    return axios.get(url, { params })
  }
}

export default ProductApiClient
