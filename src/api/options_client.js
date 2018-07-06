// @flow
import type { AxiosPromise } from 'axios'
import type { OptionsType } from '../lib/contexts/OptionsContext'
import axios from 'axios'
import api from './index'

class OptionsAPIClient {
  getOptions (): AxiosPromise<OptionsType> {
    const url = `${api.baseURL}options`

    return axios.get(url)
  }
}

export default OptionsAPIClient
