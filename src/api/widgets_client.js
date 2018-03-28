import axios from 'axios'
import api from './index'

const WidgetsClient = {

  getBySidebarSlug (sidebar) {
    const url = `${api.baseURL}widgets`
    const params = { sidebar }

    return axios.get(url, { params })
  },

  getRightSidebar () {
    return this.getBySidebarSlug('right_sidebar')
  }
}

export default WidgetsClient
