// @flow
import * as React from 'react'
import type { WPTerm } from '../../../../../types/term_types'
import { Link } from 'react-router-dom'
import { createArchiveUrl } from '../../../../../bcorpUrl'
import style from './ProductCategoryBlock.scss'

type Props = {
  productCategory: WPTerm,
  withImage?: boolean
}

class ProductCategoryBlock extends React.PureComponent<Props> {
  renderGrandchildLinks (grandchildren: Array<WPTerm>) {
    return (
      <div className={style.grandchildren}>
        {grandchildren.map((grandchild, index) => {
          return (
            <Link key={index} to={createArchiveUrl(grandchild) || '#'}>
              {this.props.withImage ? (
                <span className={`small-body ${style.grandchild}`}
                  dangerouslySetInnerHTML={{ __html: `${index !== 0 ? ', ' : ''}${grandchild.name}` }} />
              ) : (
                <div className={`small-body ${style.grandchild}`}>
                  {grandchild.name}
                </div>
              )}
            </Link>
          )
        })}
      </div>
    )
  }

  renderChildLinks () {
    if (
      !this.props.productCategory.children ||
      !this.props.productCategory.children.length
    ) {
      return null
    }

    const children = [...this.props.productCategory.children]
    const {
      childrenWithChildren,
      childrenWithoutChildren
    } = this.splitChildrenByExistenceOfGrandchildren(children)

    return (
      <React.Fragment>
        {childrenWithoutChildren.length > 0 &&
          this.renderGrandchildLinks(childrenWithoutChildren)}
        {childrenWithChildren.map((childWithChildren, index) => {
          // keep flow happy
          if (!childWithChildren.children) {
            return
          }

          return (
            <React.Fragment key={index}>
              <Link to={createArchiveUrl(childWithChildren) || '#'}>
                <h6 className={`${style.childWithChildren}`}
                  dangerouslySetInnerHTML={{ __html: childWithChildren.name }} />
              </Link>
              {childWithChildren.children &&
                childWithChildren.children.length > 0 &&
                this.renderGrandchildLinks(childWithChildren.children)}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  render () {
    return this.props.withImage ? (
      <div className={`row ${style.productCategoryBlock}`}>
        <Link to={createArchiveUrl(this.props.productCategory) || '#'}>
          <div className={`col2 ${style.featuredImage}`}>
            {this.props.productCategory.featured_image && (
              <img src={this.props.productCategory.featured_image} />
            )}
          </div>
        </Link>
        <div className={`col2 ${style.links}`}>
          <Link to={createArchiveUrl(this.props.productCategory) || '#'}>
            <h5 className={style.name}>{this.props.productCategory.name}</h5>
          </Link>

          {this.renderChildLinks()}
        </div>
      </div>
    ) : (
      <div className={`row ${style.productCategoryBlock}`}>
        <div className={`col1 ${style.links}`}>{this.renderChildLinks()}</div>
      </div>
    )
  }

  splitChildrenByExistenceOfGrandchildren (
    children: Array<WPTerm>
  ): {
    childrenWithChildren: Array<WPTerm>,
    childrenWithoutChildren: Array<WPTerm>
  } {
    let childrenWithChildren = []
    let childrenWithoutChildren = []

    // loop through all children,
    // adding to relevant array depending on existence of grandchildren
    children.forEach((child, index) => {
      if (child.children && child.children.length) {
        childrenWithChildren = [...childrenWithChildren, child]
      } else {
        childrenWithoutChildren = [...childrenWithoutChildren, child]
      }
    })

    return {
      childrenWithChildren,
      childrenWithoutChildren
    }
  }
}

export default ProductCategoryBlock
