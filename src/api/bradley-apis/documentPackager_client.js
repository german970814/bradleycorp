// @flow
import type { AxiosPromise } from 'axios'
import axios from 'axios'
import { bradleyApisHost } from './index'

export const documentPackerRoot = `${bradleyApisHost}/documentPackager`

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
};

class DocumentPackagerApiClient {
  getBimProductsAndVariantsFromModelIds (
    modelIds: Array<string>
  ): AxiosPromise<BimProductAndVariantsFromModelIdsResponse> {
    const url = `${documentPackerRoot}/bimProductsAndVariantsForModels`
    const params = { model: modelIds.join(',') }

    return axios.get(url, { params })
  }

  getBimFileZipFromVariantIds (
    variantIds: Array<number>
  ): AxiosPromise<BimFileZipFromVariantIdsResponse> {
    const url = `${documentPackerRoot}/bimFile/bimProductVariants`
    const params = { bimProductVariant: variantIds.join(',') }

    return axios.get(url, { params })
  }

  async downloadFiles (variantIds: Array<number>, name?: string): Promise<void> {
    const filename = await this.getBimZipFilename(variantIds)

    if (!filename) {
      console.warn('Couldnt get filename of zip from bradley server')
      return
    }

    const givenName = name ? `${name}.zip` : filename
    const downloadUrl = `${bradleyApisHost}/documentPackager/bimFile/${givenName}?name=${filename}`

    window.open(downloadUrl, '_blank')
  }

  async downloadMediaFiles (mediaIds: Array<number>, name?: string): Promise<void> {
    const filename = 'Bradley_Download.zip'

    const givenName = name ? `${name}.zip` : filename
    const downloadUrl = `${bradleyApisHost}/documentPackager/mediaFile/?mediaFile=${mediaIds.join(',')}`

    try {
      const response = await axios.get(downloadUrl)

      console.log( response )
      //do something with response
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  async getBimZipFilename (variantIds: Array<number>): Promise<string | false> {
    try {
      const response = await this.getBimFileZipFromVariantIds(variantIds)

      if (response.data.success) {
        return response.data.fileName
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default DocumentPackagerApiClient
export type {
  BimModel,
  BimProduct,
  BimProductVariant,
  BimProductAndVariantsFromModelIdsResponse,
  BimFileZipFromVariantIdsResponse
}
