'' // @flow
import type { BlogName, BlogPrettyName } from '../lib/types/blog_types'
import axios from 'axios'

type HostBradleyType = 'http://bradley.test' | 'http://bradleydev.twoxfour.com'

type HostTheWashfountainType =
  | 'http://thewashfountain.bradley.test'
  | 'http://thewashfountain.bradleydev.twoxfour.com'

type HostBIMRevitType =
  | 'http://bimrevit.bradley.test'
  | 'http://bimrevit.bradleydev.twoxfour.com'

type HostType = HostBradleyType | HostTheWashfountainType | HostBIMRevitType

type URLTheWashfountainType =
  | 'http://localhost:8081'
  | 'http://thewashfountain.site.bradleydev.twoxfour.com'

type URLBIMRevitType =
  | 'http://localhost:8082'
  | 'http://bimrevit.site.bradleydev.twoxfour.com'

type SiteType = BlogName | 'bcorp'

type API = {
  host: HostType,
  hostBradley: HostBradleyType,
  hostTheWashfountain: HostTheWashfountainType,
  hostBIMRevit: HostBIMRevitType,
  urlTheWashfountain: URLTheWashfountainType,
  urlBIMRevit: URLBIMRevitType,
  site: SiteType,
  sitePrettyNameDefault: string,
  sitePrettyName: BlogPrettyName | 'Bradley Corp',
  namespace: string,
  baseURL: string,
  baseURLBradley: string,
  baseURLTheWashfountain: string,
  baseURLBIMRevit: string,
  queryRoute: string,
  baseURLWPDefaultAPI: string,
  query: ({ args?: {} }) => {}
}

const dev: boolean = false

let site: SiteType = 'bcorp'

const sitePrettyNameDefault = 'Bradley Corp'
let sitePrettyName: BlogPrettyName | 'Bradley Corp' = sitePrettyNameDefault

let host: HostType = dev
  ? 'http://bradley.test'
  : 'https://bradleydev.twoxfour.com'

const hostBradley: HostBradleyType = dev
  ? 'http://bradley.test'
  : 'https://bradleydev.twoxfour.com'

const hostTheWashfountain: HostTheWashfountainType = dev
  ? 'http://thewashfountain.bradley.test'
  : 'http://thewashfountain.bradleydev.twoxfour.com'

const hostBIMRevit: HostBIMRevitType = dev
  ? 'http://bimrevit.bradley.test'
  : 'http://bimrevit.bradleydev.twoxfour.com'

const urlTheWashfountain: URLTheWashfountainType = dev
  ? 'http://localhost:8081'
  : 'http://thewashfountain.site.bradleydev.twoxfour.com'

const urlBIMRevit: URLBIMRevitType = dev
  ? 'http://localhost:8082'
  : 'http://bimrevit.site.bradleydev.twoxfour.com'

/**
 * set the api host depending on the location.href we're currently on
 *
 * both blog subdomains point to the same app on the main site,
 * we just check within the app itself which site to serve
 *
 * Since the blogs and the main site share so much functionality,
 * all we actually need is a different API client host and a different router
 */
if (location.href.includes(urlTheWashfountain)) {
  site = 'thewashfountain'
  sitePrettyName = 'The Washfountain'
  host = hostTheWashfountain
} else if (location.href.includes(urlBIMRevit)) {
  site = 'bim-revit'
  sitePrettyName = 'BIM-Revit'
  host = hostBIMRevit
}

const namespace = 'bcorp/v1/'

const queryRoute = 'wp-query'

const baseURL = `${host}/index.php/wp-json/${namespace}`

const baseURLWPDefaultAPI = `${host}/index.php/wp-json/wp/v2/`

/* Define the API object */

const api: API = {
  host,

  hostBradley,

  hostTheWashfountain,

  hostBIMRevit,

  urlTheWashfountain,

  urlBIMRevit,

  site,

  sitePrettyNameDefault,

  sitePrettyName,

  namespace,

  baseURL,

  baseURLBradley: `${hostBradley}/index.php/wp-json/${namespace}`,

  baseURLTheWashfountain: `${hostTheWashfountain}/index.php/wp-json/${namespace}`,

  baseURLBIMRevit: `${hostBIMRevit}/index.php/wp-json/${namespace}`,

  baseURLWPDefaultAPI,

  queryRoute,

  query: ({ args }) => {
    const url = `${baseURL}${queryRoute}`

    return axios.post(url, args)
  }
}

module.exports = api
export type { SiteType }
