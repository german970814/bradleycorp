// @flow
import * as React from 'react'
import type { MenuModuleMenuBlockData } from '../../../types/module_types'
import type { BCorpPostHeirarchyResponse } from '../../../types/post_types'
import CPTClient from '../../../../api/cpt_client'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'
import MenuBlock from '../../Modules/MenuModule/MenuBlock/MenuBlock'
import style from './LeftSidebarTemplate.scss'
import defaultStyle from '../Templates.scss'

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string
  },
  /**
   * A render function for the modules
   */
  renderModules: () => React.Node
}

type State = {
  menuBlock: MenuModuleMenuBlockData
}

class LeftSidebarTemplate extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      menuBlock: { children: [] }
    }
  }

  componentDidMount () {
    this.getHeirarchy(this.props.data['page_id'])
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.data['page_id'] !== this.props.data['page_id']) {
      this.getHeirarchy(nextProps.data['page_id'])
    }
  }

  renderLeftSidebar () {
    return <MenuBlock blockData={this.state.menuBlock} />
  }

  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.LeftSidebarTemplate
        }`}>
        {renderTitle(this.props.data.page_title, 'col1')}

        <div className={`col1 col4-tablet ${style.sidebar}`}>
          {this.renderLeftSidebar()}
        </div>

        <div className={`col1 col4x3-tablet ${style.content}`}>
          {this.props.renderModules()}
        </div>
      </div>
    )
  }

  async getHeirarchy (pageID: number) {
    try {
      const client = new CPTClient('page')
      const heirarchyResponse = await client.getHeirarchyById(pageID)
      const heirarchyData: BCorpPostHeirarchyResponse = heirarchyResponse.data

      // if we're loading a left sidebar template then
      // the custom page response had has_parent or has_children as true.
      //
      // however, it's a separate request, so better to be safe than sorry!
      if (!heirarchyData.parent && !heirarchyData.children) {
        return
      }

      const menuBlock: MenuModuleMenuBlockData = this.buildMenuBlock(
        heirarchyData
      )

      this.setState({ menuBlock })
    } catch (err) {
      console.log(err)
    }
  }

  buildMenuBlock (
    heirarchyData: BCorpPostHeirarchyResponse
  ): MenuModuleMenuBlockData {
    const menuBlock: MenuModuleMenuBlockData = { children: [] }
    // make sure we have an array type
    const dataChildren = heirarchyData.children ? heirarchyData.children : []

    if (heirarchyData.parent) {
      menuBlock.title = heirarchyData.parent['post_title']
      menuBlock.url = heirarchyData.parent.path
    }

    if (dataChildren.length) {
      dataChildren.forEach(child => {
        const childLink = {
          title: child['post_title'],
          url: child.path
        }

        menuBlock.children = [...menuBlock.children, childLink]
      })
    }

    return menuBlock
  }
}

export default LeftSidebarTemplate
