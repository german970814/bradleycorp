import axios from 'axios'

const api = {}

api.namespace   = `bcorp/v1/`
api.baseURL     = `http://localhost/Bradley/index.php/wp-json/${api.namespace}`
api.queryRoute  = `wp-query`

api.query = ({ args }) => {
  const url = `${api.baseURL}${api.queryRoute}`

  return axios.post(url, args)
}

module.exports = api
