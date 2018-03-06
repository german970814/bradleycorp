import React from 'react'
import PropTypes from 'prop-types'
import AllPurposeModule from '../../../../../lib/components/Modules/AllPurposeModule/AllPurposeModule'
import SinglePostModule from './SinglePostModule/SinglePostModule'
import SinglePostFeaturedModule from './SinglePostFeaturedModule/SinglePostFeaturedModule'
import MultiPostButtonModule from './MultiPostButtonModule/MultiPostButtonModule'
import MultiPostNoExcerptModule from './MultiPostNoExcerptModule/MultiPostNoExcerptModule'
import MultiPostArrowModule from './MultiPostArrowModule/MultiPostArrowModule'
import MenuModule from './MenuModule/MenuModule'
import CTAModule from '../../../../../lib/components/Modules/CTAModule/CTAModule'
import SliderModule from './SliderModule/SliderModule'
import TextWithBackgroundPeelerModule from './TextWithBackgroundPeelerModule/TextWithBackgroundPeelerModule'

const ModuleFactory = ({ data }) => {
  if (!data.name) {
    return null
  }

  switch (data.name) {
    case 'module_all_purpose':
      return (
        <AllPurposeModule
          content={data['content']} />
      )

    case 'module_cta':
      return (
        <CTAModule
          title={data['title']}
          text={data['content']}
          link={data['link_url']}
          linkText={data['link_text']} />
      )

    case 'module_menu':
      return (
        <MenuModule
          title={data['title']}
          menuSlug={data['menu_slug']} />
      )

    case 'module_multi_post_no_excerpt':
      return (
        <MultiPostNoExcerptModule
          postType={data['post_type']}
          postIDs={data['posts'].split(',')} />
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
          link={data['link_url']}
          linkText={data['link_text']}
          accentColor={data['accent_color']}
          background={data['background']}
          skin={data['skin']} />
      )

    case 'module_single_post_featured':
      return (
        <SinglePostFeaturedModule
          postIDs={[parseInt(data['posts'])]} // needs to be an array with name postIDs to extend PostGettingModule
          postType={data['post_type']}
          headline={data['headline']}
          background={data['background']} />
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
