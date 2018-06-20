// @flow
import * as React from 'react'
import type { TreeType } from '../../../../../../api/product_client'
import { Link } from 'react-router-dom'
import { createArchiveUrlFromSlugAndTax } from '../../../../../../lib/bcorpUrl'
import style from './Tree.scss'

/**
 * Note, parents array should contain the current element.
 */
type Props = {
  tree: TreeType
}

/**
 * Given a tree object consisting of parent and children categories,
 * we create an indented tree structure
 */
class Tree extends React.PureComponent<Props> {
  renderTreeLink (
    slug: string,
    name: string,
    offset: number,
    hideArrow?: boolean
  ) {
    return (
      <Link
        key={slug}
        to={createArchiveUrlFromSlugAndTax(slug, 'product_category')}>
        <div
          style={{
            paddingLeft: `${offset * 5}px`
          }}
          className={style.offsetWrapper}>
          <div
            className={`${style.treeLink} ${hideArrow ? style.hideArrow : ''}`}>
            {name}
          </div>
        </div>
      </Link>
    )
  }

  renderParents () {
    if (!this.props.tree.parents) {
      return
    }
    const { parents } = this.props.tree

    return Object.keys(parents).map((parentSlug, index) => {
      return this.renderTreeLink(parentSlug, parents[parentSlug], index)
    })
  }

  renderChildren () {
    if (!this.props.tree.children) {
      return
    }
    const { children } = this.props.tree

    const offset = this.props.tree.parents
      ? Object.keys(this.props.tree.parents).length
      : 1

    return Object.keys(children).map((childSlug, index) => {
      return this.renderTreeLink(childSlug, children[childSlug], offset)
    })
  }

  render () {
    return (
      <div className={style.tree}>
        <h6 className={style.parentTitle}>{'Categories'}</h6>
        {this.renderTreeLink('all-categories', 'All Categories', 0, true)}
        {this.renderParents()}
        {this.renderChildren()}
      </div>
    )
  }
}

export default Tree
