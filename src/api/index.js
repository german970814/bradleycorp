import axios from 'axios'

const api = {}

const dev = false

api.host = dev
  ? `http://bradley.test`
  : `http://bradleydev.twoxfour.com`

api.hostTheWashfountain = dev
  ? `http://thewashfountain.bradley.test`
  : `http://thewashfountain.bradleydev.twoxfour.com`

api.hostBIMRevit = dev
  ? `http://bimrevit.bradley.test`
  : `http://bimrevit.bradleydev.twoxfour.com`

api.urlTheWashfountain = dev
  ? `http://localhost:8081`
  : `http://thewashfountain.site.bradleydev.twoxfour.com`

api.urlBIMRevit = dev
  ? `http://localhost:8082`
  : `http://bimrevit.site.bradleydev.twoxfour.com`

/**
 * set the api host depending on the location.href we're currently on
 *
 * both blog subdomains point to the same app on the main site,
 * we just check within the app itself which site to serve
 *
 * Since the blogs and the main site share so much functionality,
 * all we actually need is a different API client host and a different router
 */
if (location.href.includes(api.urlTheWashfountain)) {
  api.site = 'thewashfountain'
  api.host = api.hostTheWashfountain
} else if (location.href.includes(api.urlBIMRevit)) {
  api.site = 'bimrevit'
  api.host = api.hostBIMRevit
} else {
  api.site = 'bcorp'
}

api.namespace = `bcorp/v1/`

api.baseURL = `${api.host}/index.php/wp-json/${api.namespace}`
api.baseURLTheWashfountain = `${api.hostTheWashfountain}/index.php/wp-json/${api.namespace}`
api.baseURLBIMRevit = `${api.hostBIMRevit}/index.php/wp-json/${api.namespace}`

api.queryRoute = `wp-query`

api.query = ({ args }) => {
  const url = `${api.baseURL}${api.queryRoute}`

  return axios.post(url, args)
}

module.exports = api
