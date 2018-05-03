// @flow
import axios from 'axios'
import type { AxiosPromise } from 'axios'
import type { Widget } from '../lib/types/widget_types'
import api from './index'

const WidgetsClient = {
  getBySidebarSlug (sidebar: string): AxiosPromise<Array<Widget>> {
    const url = `${api.baseURL}widgets`
    const params = { sidebar }

    return axios.get(url, { params })
  },

  getBlogSidebar (): AxiosPromise<Array<Widget>> {
    return this.getBySidebarSlug('blog_sidebar')
  }
}

export default WidgetsClient
