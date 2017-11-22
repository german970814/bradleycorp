import axios from 'axios'
import api from './index'

const NavMenuApiClient = {

  getNavMenu (name) {
    const url = `${api.baseURL}nav-menu`
    const params = { name }

    return axios.get(url, { params })
  }
}

export default NavMenuApiClient
