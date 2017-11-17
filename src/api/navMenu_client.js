import axios from 'axios'
import api from './index'

const NavMenuApiClient = {

  getNavMenu (id) {
    const url = `${api.baseURL}nav-menu`

    return axios.get(url)
  }
}

export default NavMenuApiClient
