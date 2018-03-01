import axios from 'axios'
import api from './index'

const NavMenuApiClient = {

  getNavMenuByLocation (location) {
    const url = `${api.baseURL}nav-menu`
    const params = { location }

    return axios.get(url, { params })
  },

  getNavMenuByName (name) {
    const url = `${api.baseURL}nav-menu`
    const params = { name }

    return axios.get(url, { params })
  },

  getNavMenuBySlug (slug) {
    const url = `${api.baseURL}nav-menu`
    const params = { slug }

    return axios.get(url, { params })
  }
}

export default NavMenuApiClient
