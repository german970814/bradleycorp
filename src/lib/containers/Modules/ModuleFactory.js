import React from 'react'
import PropTypes from 'prop-types'
import AllPurposeModule from './AllPurposeModule/AllPurposeModule'
import BackgroundImageModule from './BackgroundImageModule/BackgroundImageModule'
import SinglePostModule from './SinglePostModule/SinglePostModule'
import SinglePostFeaturedModule from './SinglePostFeaturedModule/SinglePostFeaturedModule'
import MultiPostButtonModule from './MultiPostButtonModule/MultiPostButtonModule'
import MultiPostNoExcerptModule from './MultiPostNoExcerptModule/MultiPostNoExcerptModule'
import MultiPostArrowModule from './MultiPostArrowModule/MultiPostArrowModule'
import MenuModule from './MenuModule/MenuModule'
import CTAModule from './CTAModule/CTAModule'
import SliderModule from './SliderModule/SliderModule'
import TextWithBackgroundPeelerModule from './TextWithBackgroundPeelerModule/TextWithBackgroundPeelerModule'

/**
 * Given data and a rowNode for a module,
 * we return the correct component padding through the necessary props
 */

const ModuleFactory = ({ data, rowNode, screenSize }) => {
  if (!data.name) {
    return null
  }

  const sharedProps = {
    rowNode,
    screenSize
  }

  switch (data.name) {
    case 'module_all_purpose':
      return <AllPurposeModule {...sharedProps} content={data['content']} />

    case 'module_background_image':
      return (
        <BackgroundImageModule
          {...sharedProps}
          background={data['background']}
          backgroundOverlay={data['background_overlay']}
        />
      )

    case 'module_cta':
      return (
        <CTAModule
          {...sharedProps}
          title={data['title']}
          text={data['content']}
          link={data['link_url']}
          linkText={data['link_text']}
        />
      )

    case 'module_menu':
      return (
        <MenuModule
          {...sharedProps}
          title={data['title']}
          menuSlug={data['menu_slug']}
        />
      )

    case 'module_multi_post_no_excerpt':
      return (
        <MultiPostNoExcerptModule
          {...sharedProps}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
        />
      )

    case 'module_multi_post_button':
      return (
        <MultiPostButtonModule
          {...sharedProps}
          title={data['title']}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
          accentColor={data['accent_color']}
          background={data['background']}
          backgroundOverlay={data['background_overlay']}
          skin={data['skin']}
        />
      )

    case 'module_multi_post_arrow':
      return (
        <MultiPostArrowModule
          {...sharedProps}
          title={data['title']}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
          accentColor={data['accent_color']}
          background={data['background']}
          backgroundOverlay={data['background_overlay']}
          skin={data['skin']}
        />
      )

    case 'module_single_post':
      return (
        <SinglePostModule
          {...sharedProps}
          postIDs={[parseInt(data['posts'])]} // needs to be an array with name postIDs to extend PostGettingModule
          postType={data['post_type']}
          link={data['link_url']}
          linkText={data['link_text']}
          accentColor={data['accent_color']}
          background={data['background']}
          backgroundOverlay={data['background_overlay']}
          skin={data['skin']}
        />
      )

    case 'module_single_post_featured':
      return (
        <SinglePostFeaturedModule
          {...sharedProps}
          postIDs={[parseInt(data['posts'])]} // needs to be an array with name postIDs to extend PostGettingModule
          postType={data['post_type']}
          headline={data['headline']}
          background={data['background']}
          backgroundOverlay={data['background_overlay']}
        />
      )

    case 'module_slider':
      return (
        <SliderModule
          {...sharedProps}
          title={data['title']}
          postType={data['post_type']}
          postIDs={data['posts'].split(',')}
          accentColor={data['accent_color']}
          skin={data['skin']}
        />
      )

    case 'module_text_background_peeler':
      return (
        <TextWithBackgroundPeelerModule
          {...sharedProps}
          title={data['title']}
          text={data['text']}
          boldText={data['bold_text']}
          backgroundColor={data['background_color']}
          backgroundPeeler={data['background_peeler']}
          skin={data['skin']}
        />
      )

    default:
      return null
  }
}

ModuleFactory.propTypes = {
  data: PropTypes.object.isRequired,
  rowNode: PropTypes.object.isRequired,
  screenSize: PropTypes.string
}

export default ModuleFactory
