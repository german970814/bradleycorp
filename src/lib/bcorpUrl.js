import { host } from '../api'

const bcorpUrl = {}

/**
 * Use this to create urls for custom post type pages.
 * If we update the permalinks structure in Wordpress we can just update this function to match.
 *
 * @param  {[object]} post a fetched WP_Post object
 * @return {[string]}      The url ready for use with react-router
 */
bcorpUrl.createCPTUrl = post => {
  return `/${post['post_type']}/${post['post_name']}`
}

/**
 * Removes host from the url ready for react-router Link
 * If it receives an external url then it returns false
 *
 * @param  {[string]} url A url that may or may not comtain the host
 * @return {[string]}     A url formatted for a react-router link or false
 */
bcorpUrl.removeHostFromUrl = url => {
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
bcorpUrl.youtubeParser = url => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

module.exports = bcorpUrl
