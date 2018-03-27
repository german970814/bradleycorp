import axios from 'axios'
import api from './index'

/**
 * The API Client will ALWAYS send requests to the BIMRevit site
 * regardless of what site it's used on
 *
 * @type {Object}
 */
const BIMRevitClient = {

  getRecentPosts (numberposts) {
    const url = `${api.baseURLTheWashfountain}posts`
    const params = { numberposts }

    return axios.get(url, { params })
  }
}

export default BIMRevitClient
