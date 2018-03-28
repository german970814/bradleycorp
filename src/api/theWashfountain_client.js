import axios from 'axios'
import api from './index'

/**
 * The API Client will ALWAYS send requests to the TheWashfountain site
 * regardless of what site it's used on
 *
 * @type {Object}
 */
const TheWashfountainClient = {

  getRecentPosts (numberposts) {
    const url = `${api.baseURLTheWashfountain}posts`
    const params = { numberposts }

    return axios.get(url, { params })
  }
}

export default TheWashfountainClient