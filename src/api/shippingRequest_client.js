// @flow
import type { AxiosPromise } from 'axios'
import type { ShippingInfoType } from '../apps/Bradley/Pages/LiteratureAndChipSamples/LiteratureAndChipSamples'
import axios from 'axios'
import api from './index'

type ShippingRequest = {|
  userID: number,
  shippingInfo: ShippingInfoType,
  items: {}
|};

/**
 * API Client for using the default WP REST API
 */

const ShippingRequestAPIClient = {
  /**
   * POST
   */

  postNewShippingRequest (request: ShippingRequest): AxiosPromise<number> {
    const url = `${api.baseURL}shipping-request`

    const body = {
      user_id: request.userID,
      shipping_info: request.shippingInfo,
      items: request.items
    }

    console.log(body)

    return axios.post(url, body)
  }
}

export default ShippingRequestAPIClient
export type { ShippingRequest }
