import axios from 'axios'
import api from './index'
import CPTApiClient from './cpt'

class ProductApiClient extends CPTApiClient {
  constructor() {
    super( 'product' )
  }

}

export default ProductApiClient
