import React from 'react'
import PropTypes from 'prop-types'
import SinglePostModule from './SinglePostModule/SinglePostModule'
import MultiPostButtonModule from './MultiPostButtonModule/MultiPostButtonModule'
import CTAModule from '../../../../../lib/components/Modules/CTAModule/CTAModule'

const ModuleFactory = ({ data }) => {
  if (!data.name) {
    return null
  }

  switch (data.name) {
    case 'module_cta':
      return (
        <CTAModule
          title={data['title']}
          text={data['text']}
          link={data['link']}
          linkText={data['link_text']} />
      )

    case 'module_multi_post_button':
      return (
        <MultiPostButtonModule
          title={data['title']}
          postIDs={[126, 126, 126]}
          accentColor={data['accent_color']}
          background={data['background']}
          skin={data['skin']} />
      )

    case 'module_single_post':
      return (
        <SinglePostModule
          postID={parseInt(data['post'])}
          accentColor={data['accent_color']}
          background={data['background']}
          skin={data['skin']} />
      )

    default:
      return null
  }
}

ModuleFactory.propTypes = {
  data: PropTypes.object.isRequired
}

export default ModuleFactory
