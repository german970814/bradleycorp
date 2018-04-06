import axios from 'axios'
import api from './index'

const WidgetsClient = {
  getBySidebarSlug (sidebar) {
    const url = `${api.baseURL}widgets`
    const params = { sidebar }

    return axios.get(url, { params })
  },

  getBlogSidebar () {
    return this.getBySidebarSlug('blog_sidebar')
  }
}

export default WidgetsClient
