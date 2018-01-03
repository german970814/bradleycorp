import React, { Component }from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import style from './Lightbox.scss'

class LightboxContent extends Component {
  constructor(props){
    super(props)

    this.handleWindowResize = debounce(this.handleWindowResize.bind(this), 200)
  }

  componentDidMount () {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize () {
    this.props.updateContentSize(this.contentNode.offsetWidth, this.contentNode.offsetHeight)
  }

  render() {
    return (
      <div
        className={style.lightbox}
        ref={node => {
          if (node !== null) {
            this.contentNode = node;
          }
        }} >
        {this.props.children}
      </div>
    )
  }
}

LightboxContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  closeLightbox: PropTypes.func.isRequired,
  updateContentSize: PropTypes.func.isRequired
}

export default LightboxContent
