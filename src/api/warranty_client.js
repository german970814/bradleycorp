// @flow
import type { AxiosPromise } from 'axios'
import axios from 'axios'
import api from './index'
import CPTApiClient from './cpt_client'

type PrintableType = {
  customerName?: string,
  jobName?: string,
  purchaseOrder?: string,
  invoice?: string,
  invoiceDate?: string,
  warrantyID?: number
}

class WarrantyAPIClient extends CPTApiClient {
  constructor () {
    super('warranty')
  }

  getPrintable ({
    customerName,
    jobName,
    purchaseOrder,
    invoice,
    invoiceDate,
    warrantyID
  }: PrintableType): AxiosPromise<string> {
    const url = `${api.baseURL}warranty/custom`
    const params = {
      customer_name: customerName,
      job_name: jobName,
      purchase_order: purchaseOrder,
      invoice,
      invoice_date: invoiceDate,
      warranty_id: warrantyID
    }

    return axios.get(url, { params })
  }
}

export default WarrantyAPIClient
export type { PrintableType }
