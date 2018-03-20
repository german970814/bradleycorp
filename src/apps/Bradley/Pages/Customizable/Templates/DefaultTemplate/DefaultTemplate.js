import React from 'react'
import PropTypes from 'prop-types'

const DefaultTemplate = props => {
  return (
    <div className={'defaultTemplate'}>
      {props.renderModules()}
    </div>
  )
}

DefaultTemplate.propTypes = {
  data: PropTypes.object,
  renderModules: PropTypes.func.isRequired,
  renderWidgets: PropTypes.func.isRequired
}

export default DefaultTemplate
