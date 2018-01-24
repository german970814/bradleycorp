import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Footer.scss'

class Footer extends Component {
  render () {
    return (
      <footer className={style.footer}>
      </footer>
    )
  }
}

Footer.propTypes = {
  menu1: PropTypes.array,
  menu2: PropTypes.array,
  menu3: PropTypes.array,
  socialMediaIcons: PropTypes.array
}

export default Footer
