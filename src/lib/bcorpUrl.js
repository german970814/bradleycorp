const bcorpUrl = {}

bcorpUrl.createCPTUrl = post => {
  return `${post['post_type']}/${post['post_name']}`
}

bcorpUrl.youtubeParser = url => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

module.exports = bcorpUrl
