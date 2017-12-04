import axios from 'axios'

const api = {}

api.host = `http://bradley.dev`
api.namespace = `bcorp/v1/`
api.baseURL = `${api.host}/index.php/wp-json/${api.namespace}`
api.queryRoute = `wp-query`

api.query = ({ args }) => {
  const url = `${api.baseURL}${api.queryRoute}`

  return axios.post(url, args)
}

module.exports = api
