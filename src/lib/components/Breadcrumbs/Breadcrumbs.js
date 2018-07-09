// @flow
import * as React from 'react'
import type { TreeType } from '../../types/response_types'
import { Link } from 'react-router-dom'
import { createArchiveUrlFromSlugAndTax } from '../../bcorpUrl'
import style from './Breadcrumbs.scss'

/**
 * A component for displaying page breadcrumbs.
 *
 * Eg grandparent -> parent -> child
 */

/**
 * The expected shape of the breadcrumbs object passed as props.
 *
 * Make sure to keep the object in the order you want to breadcrumbs to appear,
 * using only plain non-numerical strings as object keys (to preserve order)
 */
type BreadcrumbsType = {
  [string]: {
    name: string,
    link: string
  }
}

type Props = {
  breadcrumbs: BreadcrumbsType
}

class Breadcrumbs extends React.PureComponent<Props> {
  render () {
    return (
      <h6 className={style.breadcrumbs}>
        {Object.keys(this.props.breadcrumbs).map((parentSlug, index) => {
          return (
            <Link key={index} to={this.props.breadcrumbs[parentSlug].link}>
              <span className={style.breadcrumbItem}>
                {this.props.breadcrumbs[parentSlug].name}
              </span>
            </Link>
          )
        })}
      </h6>
    )
  }
}

/**
 * Helper functions
 */

/**
 * A component which wishes to use the Breadcrumbs component,
 * and already has a tree of child/parent terms of the shape TreeType,
 * (the tree consisting of terms)
 * can use this function to convert its' TreeType object to an object
 * with shape expected by the breadcrumbs prop.
 */
export function createBreadcrumbsObjectFromTermTree (
  tree: TreeType,
  taxonomy: string
): BreadcrumbsType {
  if (!tree.parents) {
    return {}
  }

  const parents = { ...tree.parents }
  let breadcrumbObject = {}

  Object.keys(parents).forEach(parentSlug => {
    const newBreadcrumb = {}
    newBreadcrumb[parentSlug] = {
      name: parents[parentSlug],
      link: createArchiveUrlFromSlugAndTax(parentSlug, taxonomy)
    }

    breadcrumbObject = {
      ...breadcrumbObject,
      ...newBreadcrumb
    }
  })

  return breadcrumbObject
}

export default Breadcrumbs
