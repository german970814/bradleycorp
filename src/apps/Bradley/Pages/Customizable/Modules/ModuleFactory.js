import React from 'react'
import PropTypes from 'prop-types'
import SinglePostModule from './SinglePostModule/SinglePostModule'
import MultiPostButtonModule from './MultiPostButtonModule/MultiPostButtonModule'
import MultiPostArrowModule from './MultiPostArrowModule/MultiPostArrowModule'
import CTAModule from '../../../../../lib/components/Modules/CTAModule/CTAModule'
import SliderModule from './SliderModule/SliderModule'
import TextWithBackgroundPeelerModule from './TextWithBackgroundPeelerModule/TextWithBackgroundPeelerModule'

const ModuleFactory = ({ data }) => {
  if (!data.name) {
    return null
  }

  switch (data.name) {
    case 'module_cta':
      return (
        <CTAModule
          title={data['title']}
          text={data['content']}
          link={data['link']}
          linkText={data['link_text']} />
      )

    case 'module_multi_post_button':
      return (
        <MultiPostButtonModule
          title={data['title']}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
          accentColor={data['accent_color']}
          background={data['background']}
          skin={data['skin']} />
      )

    case 'module_multi_post_arrow':
      return (
        <MultiPostArrowModule
          title={data['title']}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
          accentColor={data['accent_color']}
          background={data['background']}
          skin={data['skin']} />
      )

    case 'module_single_post':
      return (
        <SinglePostModule
          postIDs={[parseInt(data['posts'])]} // needs to be an array with name postIDs to extend PostGettingModule
          postType={data['post_type']}
          accentColor={data['accent_color']}
          background={data['background']}
          skin={data['skin']} />
      )

    case 'module_slider':
      return (
        <SliderModule
          title={data['title']}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
          accentColor={data['accent_color']}
          skin={data['skin']} />
      )

    case 'module_text_background_peeler':
      return (
        <TextWithBackgroundPeelerModule
          title={data['title']}
          text={data['text']}
          background={data['background']}
          backgroundPeeler={data['background_peeler']}
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
