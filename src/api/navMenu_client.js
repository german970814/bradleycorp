import axios from 'axios'
import api from './index'

const NavMenuApiClient = {

  getNavMenuByLocation (location, nested) {
    const url = `${api.baseURL}nav-menu`
    const params = { location, nested }

    return axios.get(url, { params })
  },

  getNavMenuByName (name, nested) {
    const url = `${api.baseURL}nav-menu`
    const params = { name, nested }

    return axios.get(url, { params })
  },

  getNavMenuBySlug (slug, nested) {
    const url = `${api.baseURL}nav-menu`
    const params = { slug, nested }

    return axios.get(url, { params })
  }
}

export default NavMenuApiClient
