// @flow
import type { AxiosPromise } from 'axios'
import type { ChipSamplePost } from '../lib/types/cpt_types'
import axios from 'axios'
import api from './index'

type MaterialTypes = {
  [number | string]: ?string
}

class LiteratureAndChipSamplePageClient {
  getChipSamplePage (): AxiosPromise<{
    chip_samples: Array<ChipSamplePost>,
    material_types: MaterialTypes
  }> {
    const url = `${api.baseURL}page/lit-and-chip-samples/chip-samples-page`

    return axios.get(url)
  }
}

export default LiteratureAndChipSamplePageClient
export type { MaterialTypes }
