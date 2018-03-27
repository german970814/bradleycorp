import axios from 'axios'

const api = {}

const dev = true

api.host = (href => {
  if (dev) {
    if (href.includes('8081')) {
      api.site = 'thewashfountain'
      return `http://thewashfountain.bradley.test`
    } else if (href.includes('8082')) {
      api.site = 'bimrevit'
      return `http://bimrevit.bradley.test`
    } else {
      api.site = 'bcorp'
      return `http://bradley.test`
    }
  } else {
    if (href.includes('thewashfountain.')) {
      api.site = 'thewashfountain'
      return `http://thewashfountain.bradleydev.twoxfour.com`
    } else if (href.includes('bimrevit.')) {
      api.site = 'bimrevit'
      return `http://bimrevit.bradleydev.twoxfour.com`
    } else {
      api.site = 'bcorp'
      return `http://bradleydev.twoxfour.com`
    }
  }
})(location.href)

api.namespace = `bcorp/v1/`

api.baseURL = `${api.host}/index.php/wp-json/${api.namespace}`

api.queryRoute = `wp-query`

api.query = ({ args }) => {
  const url = `${api.baseURL}${api.queryRoute}`

  return axios.post(url, args)
}

module.exports = api
