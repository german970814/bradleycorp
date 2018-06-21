// @flow
import * as React from 'react'
import type { TreeType } from '../../types/response_types'
import { Link } from 'react-router-dom'
import { createArchiveUrlFromSlugAndTax } from '../../bcorpUrl'
import style from './Breadcrumbs.scss'

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
            <Link to={this.props.breadcrumbs[parentSlug].link}>
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
