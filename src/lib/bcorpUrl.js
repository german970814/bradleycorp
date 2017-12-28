const bcorpUrl = {}

bcorpUrl.createCPTUrl = post => {
  return `${post['post_type']}/${post['post_name']}`
}

module.exports = bcorpUrl
