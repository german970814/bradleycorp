// @flow
import type { AxiosPromise } from 'axios'
import type { TreeType } from '../lib/types/response_types'
import type {
  CategoryData,
  TaxFilterGroup
} from '../apps/Bradley/Pages/ProductCategory/ProductCategory'
import axios from 'axios'
import api from './index'
import CPTApiClient from './cpt_client'

type CategoryPageMetaFiltersResponse = {
  product_new_until?: number,
  product_attributes?: {
    // attribute name
    [string]: {
      // attribute value: count
      [string]: number
    }
  }
}

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
      meta_filters: CategoryPageMetaFiltersResponse,
      tax_filters: TaxFilterGroup
    },
    tree: TreeType
  }> {
    const url = `${api.baseURL}page/product-category`
    const params = { slug, data_part: dataPart }

    return axios.get(url, { params })
  }
}

export default ProductApiClient
