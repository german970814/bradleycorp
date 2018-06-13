// @flow
import * as React from 'react'
import type { WPTerm } from '../../../../../../../types/term_types'
import { Link } from 'react-router-dom'
import { createArchiveUrl } from '../../../../../../../bcorpUrl'
import style from './ProductCategoryBlock.scss'

type Props = {
  productCategory: WPTerm
}

class ProductCategoryBlock extends React.PureComponent<Props> {
  renderGrandchildLinks (grandchildren: Array<WPTerm>) {
    return (
      <div className={style.grandchildren}>
        {grandchildren.map((grandchild, index) => {
          return (
            <span key={index} className={`small-body ${style.grandchild}`}>
              {`${index !== 0 ? ', ' : ''}${grandchild.name}`}
            </span>
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
        {this.renderGrandchildLinks(childrenWithoutChildren)}
        {childrenWithChildren.map((childWithChildren, index) => {
          // keep flow happy
          if (!childWithChildren.children) {
            return
          }

          return (
            <React.Fragment key={index}>
              <div className={style.childWithChildren}>
                {childWithChildren.name}
              </div>
              {this.renderGrandchildLinks(childWithChildren.children)}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  render () {
    return (
      <div className={`row ${style.productCategoryBlock}`}>
        <div className={`col2 ${style.featuredImage}`}>
          {this.props.productCategory.featured_image && (
            <img src={this.props.productCategory.featured_image} />
          )}
        </div>
        <div className={`col2 ${style.links}`}>
          <h6 className={style.name}>{this.props.productCategory.name}</h6>
          {this.renderChildLinks()}
        </div>
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
