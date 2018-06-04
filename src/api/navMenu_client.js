// @flow
import axios from 'axios'
import api from './index'

const NavMenuApiClient = {
  getNavMenuByLocation (
    location: string,
    nested?: boolean,
    fromMainSite?: boolean
  ) {
    const baseURL = fromMainSite ? api.baseURLBradley : api.baseURL
    const url = `${baseURL}nav-menu`
    const params = { location, nested }

    return axios.get(url, { params })
  },

  getNavMenuByName (name: string, nested?: boolean, fromMainSite?: boolean) {
    const baseURL = fromMainSite ? api.baseURLBradley : api.baseURL
    const url = `${baseURL}nav-menu`
    const params = { name, nested }

    return axios.get(url, { params })
  },

  getNavMenuBySlug (slug: string, nested?: boolean, fromMainSite?: boolean) {
    const baseURL = fromMainSite ? api.baseURLBradley : api.baseURL
    const url = `${baseURL}nav-menu`
    const params = { slug, nested }

    return axios.get(url, { params })
  }
}

export default NavMenuApiClient
