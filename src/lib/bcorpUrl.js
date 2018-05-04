// @flow
import type { WPPost } from './types/post_types'
import type { WPTerm } from './types/term_types'
import { host } from '../api'

const bcorpUrl = {}

/**
 * Use this to create urls for custom post type pages.
 * If we update the permalinks structure in Wordpress we can just update this function to match.
 *
 * @param  {object} post a fetched WP_Post object
 * @return {string|boolean}      The url ready for use with react-router
 */
bcorpUrl.createCPTUrl = (post: WPPost): false | string => {
  if (post.path) {
    return bcorpUrl.removeHostFromUrl(post.path) || post.path
  }

  if (post['post_type'] && post['post_name']) {
    return `/${post['post_type']}/${post['post_name']}`
  }

  return false
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
    return `/${term.taxonomy}/${term.slug}`
  }

  return false
}

/**
 * Removes host from the url ready for react-router Link
 * If it receives an external url then it returns false
 *
 * @param  {string} url A url that may or may not comtain the host
 * @return {string|boolean}     A url formatted for a react-router link or false
 */
bcorpUrl.removeHostFromUrl = (url: string): false | string => {
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

module.exports = bcorpUrl
