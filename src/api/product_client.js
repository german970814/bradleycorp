import CPTApiClient from './cpt_client'

class ProductApiClient extends CPTApiClient {
  constructor () {
    super('product')
  }
}

export default ProductApiClient
