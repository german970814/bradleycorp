import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'

const YoutubeWithOpts = props => {
  const opts = {
    width: props.style.width,
    height: props.style.height,
    playerVars: {
      showinfo: 0,
      modestbranding: 1,
      controls: 0
    }
  }
  return <YouTube videoId={props.videoId} opts={opts} />
}

YoutubeWithOpts.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  videoId: PropTypes.string.isRequired
}

export default YoutubeWithOpts
