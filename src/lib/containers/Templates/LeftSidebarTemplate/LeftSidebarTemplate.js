// @flow
import * as React from 'react'
import type { MenuModuleMenuBlockData } from '../../../types/module_types'
import type {
  BCorpPostTreeResponse,
  BCorpPostHeirarchyResponse
} from '../../../types/post_types'
import type { ScreenSize } from '../../../contexts/ScreenSizeContext'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import CPTClient from '../../../../api/cpt_client'
import { renderTitle } from '../DefaultTemplate/DefaultTemplate'
import MenuBlock from '../../Modules/MenuModule/MenuBlock/MenuBlock'
import style from './LeftSidebarTemplate.scss'
import defaultStyle from '../Templates.scss'

/**
 * Defines a layout which includes a Left Sidebar.
 *
 * As per the designs,
 * the Left Sidebar will always render a page tree for navigation
 * showing the entire heirarchy of parents and children
 * in which the current page lies.
 *
 * The tree is organised into blocks
 * with parents as the title and children as the links below.
 *
 * If any child at any level in the tree has its own children,
 * then it breaks out and creates a new block.
 */

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
  renderModules: () => React.Node,
  hideTitle?: boolean,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  menuBlocks: Array<MenuModuleMenuBlockData>
}

class LeftSidebarTemplate extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      menuBlocks: [{ children: [] }]
    }
  }

  componentDidMount () {
    this.getTree(this.props.data['page_id'])
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.data['page_id'] !== this.props.data['page_id']) {
      this.getTree(nextProps.data['page_id'])
    }
  }

  renderMenuBlocks () {
    const collapsible = this.props.screenSize === 'mobile'

    return this.state.menuBlocks.map((menuBlock, index) => {
      return (
        <div key={index} className={style.menuBlockWrapper}>
          <MenuBlock blockData={menuBlock} collapsible={collapsible} />
        </div>
      )
    })
  }

  renderLeftSidebar () {
    return this.renderMenuBlocks()
  }

  render () {
    return (
      <div
        className={`row ${defaultStyle.defaultTemplate} ${
          style.LeftSidebarTemplate
        }`}>
        {this.props.hideTitle
          ? null
          : renderTitle(this.props.data.page_title, 'col1')}

        <div className={`col1 col4-tablet ${style.sidebar} sidebar`}>
          {this.renderLeftSidebar()}
        </div>

        <div className={`col1 col4x3-tablet ${style.content}`}>
          {this.props.renderModules()}
        </div>
      </div>
    )
  }

  async getTree (pageID: number) {
    try {
      const client = new CPTClient('page')
      const treeResponse = await client.getTreeById(pageID)
      const treeData: BCorpPostTreeResponse = treeResponse.data

      // if we're loading a left sidebar template then
      // the custom page response had has_parent or has_children as true.
      //
      // however, it's a separate request, so better to be safe than sorry!
      if (
        treeData.length === 0 ||
        (!treeData[0].parent && !treeData[0].children)
      ) {
        return
      }

      const menuBlocks: Array<MenuModuleMenuBlockData> = treeData.map(
        heirarchyData => {
          return this.buildMenuBlock(heirarchyData)
        }
      )

      this.setState({ menuBlocks })
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

export default withScreenSize(LeftSidebarTemplate)
