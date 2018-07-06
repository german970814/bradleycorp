import vars from './scss/partials/_variables.scss'
import { sitePrettyName, sitePrettyNameDefault } from './api/index'

const MOBILEMAXWIDTH = parseInt(vars.MobileMaxWidth)
const TABLETMAXWIDTH = parseInt(vars.TabletMaxWidth)

module.exports = {
  MOBILEMAXWIDTH,
  TABLETMAXWIDTH
}
