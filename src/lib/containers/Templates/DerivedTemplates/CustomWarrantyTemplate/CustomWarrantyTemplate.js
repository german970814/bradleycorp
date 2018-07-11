// @flow
import * as React from 'react'
import type { BCorpMetaboxes } from '../../../../types/customPage_types'
import LeftSidebarTemplate from '../../LeftSidebarTemplate/LeftSidebarTemplate'
import CustomWarrantyForm from './CustomWarrantyForm/CustomWarrantyForm'
import style from './CustomWarrantyTemplate.scss'

/**
 * Renders the CustomWarrantyForm within a LeftSidebarTemplate.
 *
 * Custom content is allowed from the CMS but is passed through to form
 * to be rendered there.
 */

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string,
    metaboxes: false | BCorpMetaboxes
  },
  renderModules: () => React.Node
}

class CustomWarrantyTemplate extends React.Component<Props> {
  renderContent () {
    return (
      <div className={style.customWarrantyTemplateContent}>
        <CustomWarrantyForm renderDescription={this.props.renderModules} />
      </div>
    )
  }

  render () {
    return (
      <div className={style.CustomWarrantyTemplate}>
        <LeftSidebarTemplate
          data={this.props.data}
          renderModules={this.renderContent.bind(this)}
        />
      </div>
    )
  }
}

export default CustomWarrantyTemplate
