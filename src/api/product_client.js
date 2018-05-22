// @flow
import type { AxiosPromise } from 'axios'
import type {
  CategoryData,
  TaxFilterGroup,
  MetaFilterGroup
} from '../apps/Bradley/Pages/ProductCategory/ProductCategory'
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

  getProductCategoryPage (
    slug: string,
    dataPart?: string = 'all'
  ): AxiosPromise<{
    category_data: CategoryData,
    filters: {
      meta_filters: MetaFilterGroup,
      tax_filters: TaxFilterGroup
    }
  }> {
    const url = `${api.baseURL}page/product-category`
    const params = { slug, data_part: dataPart }

    return axios.get(url, { params })
  }
}

export default ProductApiClient
