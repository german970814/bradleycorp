// @flow
import axios from 'axios'
import api from './index'

const NavMenuApiClient = {
  getNavMenuByLocation (location: string, nested?: boolean) {
    const url = `${api.baseURL}nav-menu`
    const params = { location, nested }

    return axios.get(url, { params })
  },

  getNavMenuByName (name: string, nested?: boolean) {
    const url = `${api.baseURL}nav-menu`
    const params = { name, nested }

    return axios.get(url, { params })
  },

  getNavMenuBySlug (slug: string, nested?: boolean) {
    const url = `${api.baseURL}nav-menu`
    const params = { slug, nested }

    return axios.get(url, { params })
  }
}

export default NavMenuApiClient
