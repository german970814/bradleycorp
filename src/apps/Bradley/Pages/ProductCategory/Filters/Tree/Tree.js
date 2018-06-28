// @flow
import * as React from 'react'
import type { TreeType } from '../../../../../../lib/types/response_types'
import { Link } from 'react-router-dom'
import { createArchiveUrlFromSlugAndTax } from '../../../../../../lib/bcorpUrl'
import { allCategoriesSlug } from '../../ProductCategory'
import style from './Tree.scss'

/**
 * Note, parents array should contain the current element.
 */
type Props = {
  tree: TreeType
};

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

    let slugString = '';
    return Object.keys(parents).map((parentSlug, index) => {
      if ( 0 < index ) {
        slugString += '/' + parentSlug
      } else {
        slugString = parentSlug
      }
      return this.renderTreeLink(slugString, parents[parentSlug], index)
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
      const parentsUrl = this.props.tree.parents
        ? Object.keys(this.props.tree.parents).join('/')
        : ''
      const slugString = parentsUrl + '/' + childSlug
      return this.renderTreeLink(slugString, children[childSlug], offset)
    })
  }

  render () {
    return (
      <div className={style.tree}>
        <h6 className={style.parentTitle}>{'Categories'}</h6>
        {this.renderTreeLink(allCategoriesSlug, 'All Categories', 0, true)}
        {this.renderParents()}
        {this.renderChildren()}
      </div>
    )
  }
}

export default Tree
