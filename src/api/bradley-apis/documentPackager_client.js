// @flow
import axios from 'axios'
import type { AxiosPromise } from 'axios'

const documentPackerRoot = 'https://www.bradleycorp.com/documentPackager/'

// a bim 'model' has a one to many relationship with products
// model -> 1toMany -> product
type BimModel = {
  product: string,
  model: string
}

// a product has its own id, and belongs to a model, but there can exist further variants
// product -> 1toMany -> product variants
type BimProduct = {
  id: number,
  imageUrl: string,
  name: string,
  description: string
}

// A variant is how it sounds, a variant of a product.
//
// In this version of the product variant object,
// the actual product is stored as a property.
//
// This is because from now on, Bradley wants to display all the variants indiviually
// rather than grouped by product.
type BimProductVariant = {
  id: number,
  name: string,
  description: string | null,
  product: BimProduct
}

/*
Response Shapes
 */

type BimProductAndVariantsFromModelIdsResponse = {
  models: Array<BimModel>,
  bimProductVariants: Array<BimProductVariant>
}

type BimFileZipFromVariantIdsResponse = {
  fileName: string,
  fileSize: string,
  success: boolean
}

class DocumentPackagerApiClient {
  getBimProductsAndVariantsFromModelIds (
    modelIds: Array<string>
  ): AxiosPromise<BimProductAndVariantsFromModelIdsResponse> {
    const url = `${documentPackerRoot}bimProductsAndVariantsForModels`
    const params = { model: modelIds.join(',') }

    return axios.get(url, { params })
  }

  getBimFileZipFromVariantIds (
    variantIds: Array<number>
  ): AxiosPromise<BimFileZipFromVariantIdsResponse> {
    const url = `${documentPackerRoot}bimFile/bimProductVariants`
    const params = { bimProductVariant: variantIds.join(',') }

    return axios.get(url, { params })
  }
}

export default DocumentPackagerApiClient
