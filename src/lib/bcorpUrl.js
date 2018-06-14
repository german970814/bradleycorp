// @flow
import type { Match } from 'react-router-dom'
import type { WPPost } from './types/post_types'
import type { WPTerm } from './types/term_types'
import type { MegaMenuNavMenuItem } from './types/megaMenu_types'
import { host } from '../api'

const bcorpUrl = {}

/**
 * Get the route by pasing a WPPost object of any post type
 * (excluding special types like nav_menu_item and attachment)
 *
 * @param  {object} post a fetched WP_Post object
 * @return {string|boolean}      The url ready for use with react-router
 */
bcorpUrl.createCPTUrl = (post: WPPost): false | string => {
  if (post.path) {
    return bcorpUrl.processPathForRoute(post.path)
  }

  if (post['post_type'] && post['post_name']) {
    return bcorpUrl.getClientSideCPTPermalink(
      post['post_type'],
      post['post_name']
    )
  }

  return false
}

/**
 * Get the Url for a nav menu item
 */
bcorpUrl.createNavMenuItemUrl = (
  navMenuItem: MegaMenuNavMenuItem
): false | string => {
  if (navMenuItem.type === 'custom') {
    return navMenuItem.url
  }

  if (navMenuItem.object_post_type && navMenuItem.object_post_name) {
    return bcorpUrl.getClientSideCPTPermalink(
      navMenuItem.object_post_type,
      navMenuItem.object_post_name
    )
  }

  if (navMenuItem.url) {
    return bcorpUrl.removeHostFromUrl(navMenuItem.url)
  }

  return false
}

/**
 * Use this to create urls for custom post type pages.
 * If we update the permalinks structure in Wordpress we can just update this function to match.
 */
bcorpUrl.getClientSideCPTPermalink = (
  postType: string,
  postName: string,
  path?: string
): string => {
  // always prioritise path to allow for heirarchichal structures
  if (path) {
    return bcorpUrl.processPathForRoute(path)
  }

  if (postType === 'page') {
    return `/${postName}`
  }

  // we need to change two-word post type names
  if (postType === 'application_gallery') {
    return `/application-gallery/${postName}`
  }

  if (postType === 'case_study') {
    return `/case-study/${postName}`
  }

  if (postType === 'technical_info') {
    return `/technical-info/${postName}`
  }

  if (postType === 'video_gallery') {
    return `/video-gallery/${postName}`
  }

  // else keep back end permalink structure
  return `/${postType}/${postName}`
}

/**
 * If we have a post type with a heirarchichal structure we will need to use the path,
 * so we prepare it for the router here.
 */
bcorpUrl.processPathForRoute = (path: string): string => {
  const route = bcorpUrl.removeHostFromUrl(path) || path
  return route.charAt(0) !== '/' ? `/${route}` : route
}

/**
 * Use this to create urls for terms linking to their archive page.
 * If we update the permalinks structure in Wordpress we can just update this function to match.
 *
 * @param  {object} post a fetched WP_Term object
 * @return {string|boolean}      The url ready for use with react-router
 */
bcorpUrl.createArchiveUrl = (term: WPTerm): false | string => {
  if (term.taxonomy && term.slug) {
    if (term.taxonomy === 'product_category') {
      return `/product-category/${term.slug}`
    }

    return `/${term.taxonomy}/${term.slug}`
  }

  return false
}

/**
 * Removes host from the url ready for react-router Link
 * If it receives a relative url then that is just returned
 * If it receives an external url then it returns false
 *
 * @param  {string} url A url that may or may not comtain the host
 * @return {string|boolean}     A url formatted for a react-router link or false
 */
bcorpUrl.removeHostFromUrl = (url: string): false | string => {
  if (url.charAt(0) === '/' && !url.includes(host)) {
    return url
  }

  if (!url.includes(host)) {
    return false
  }

  return url.replace(host, '')
}

/**
 * Takes a youtube url and returns the video ID.
 * This can take a variety of different url and embed link formats
 *
 * @param  {[string]} url A youtube embed link or video page url
 * @return {[string]}     The youtube unique video ID
 */
bcorpUrl.youtubeParser = (url: string): false | string => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

/**
 * NOTE: BIG NOTE. This wont work if the route match includes a *,
 * you'll need to provide a special case
 */
bcorpUrl.replacePathWithMatchParams = (
  match: Match,
  replaceParams?: { [string]: string | number }
): string => {
  if (!match.params || Object.keys(match.params).length === 0) {
    return match.url
  }

  if (match.path.includes('/*/')) {
    return match.url
  }

  let newUrl = match.path

  Object.keys(match.params).forEach(param => {
    const replace = `:${param}`

    let replaceWith = match.params[param] || ''
    if (replaceParams && replaceParams[param]) {
      replaceWith = replaceParams[param].toString()
    }

    newUrl = newUrl.replace(replace, replaceWith)
  })

  return newUrl
}

bcorpUrl.getUrlWithoutPageParam = (match: Match): string => {
  let url = match.url

  // remove any trailing /
  if (url.slice(-1) === '/') {
    url = url.slice(0, -1)
  }

  // remove page param
  return url.replace(/\/page=\d*/g, '')
}

module.exports = bcorpUrl
