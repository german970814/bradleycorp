const bcorpUrl = {}

bcorpUrl.createCPTUrl = post => {
  return `archives/${post['post_type']}/${post['post_name']}`
}

module.exports = bcorpUrl
