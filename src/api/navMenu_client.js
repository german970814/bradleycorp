// @flow
import axios from 'axios'
import type { AxiosPromise } from 'axios'
import type { MegaMenuNavMenuItem } from '../lib/types/megaMenu_types'
import api from './index'

const NavMenuApiClient = {
  getNavMenuByLocation (
    location: string,
    nested?: boolean,
    fromMainSite?: boolean
  ): AxiosPromise<Array<MegaMenuNavMenuItem>> {
    const baseURL = fromMainSite ? api.baseURLBradley : api.baseURL
    const url = `${baseURL}nav-menu`
    const params = { location, nested }

    return axios.get(url, { params })
  },

  getNavMenuByName (
    name: string,
    nested?: boolean,
    fromMainSite?: boolean
  ): AxiosPromise<Array<MegaMenuNavMenuItem>> {
    const baseURL = fromMainSite ? api.baseURLBradley : api.baseURL
    const url = `${baseURL}nav-menu`
    const params = { name, nested }

    return axios.get(url, { params })
  },

  getNavMenuBySlug (
    slug: string,
    nested?: boolean,
    fromMainSite?: boolean
  ): AxiosPromise<Array<MegaMenuNavMenuItem>> {
    const baseURL = fromMainSite ? api.baseURLBradley : api.baseURL
    const url = `${baseURL}nav-menu`
    const params = { slug, nested }

    return axios.get(url, { params })
  }
}

export default NavMenuApiClient
