// @flow
import * as React from 'react'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../globals'
import CategoryDescription from './CategoryDescription/CategoryDescription'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import style from './ProductCategory.scss'

type FilterGroup = {
  [string]: {
    number: number,
    selected: boolean
  }
}

type Props = {}

type State = {
  filters: {
    [string]: FilterGroup
  },
  paged: number
}

class ProductCategory extends React.Component<Props, State> {
  childCategory: string
  topCategory: string
  categoryDescription: string
  categoryLinks: Array<{ name: string, link: string }>

  constructor (props: Props) {
    super(props)

    this.state = {
      filters: {},
      paged: 0
    }

    this.topCategory = 'Safety Fixtures'
    this.childCategory = 'Combination Fixtures'
    this.categoryDescription =
      'Lorem ipsum dolor sit amet, consectetur adiciagewbng elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Al ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adiciagewbng elit.'
    this.categoryLinks = [
      { name: 'link title goes right here', link: '#' },
      { name: 'link title goes right here', link: '#' }
    ]
  }

  renderContent (isMobile: boolean) {
    return (
      <div className={`row ${style.content}`}>
        <CategoryDescription
          isMobile={isMobile}
          links={this.categoryLinks}
          description={this.categoryDescription}
          logoSrc={
            'http://bradleydev.twoxfour.com/wp-content/uploads/2018/01/halo-web-icon@3x.png'
          }
        />
        <div className={`col1 col4-tablet ${style.sidebar}`} />
        <div className={`col1 col4x3-tablet ${style.sidebar}`} />
      </div>
    )
  }

  render () {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match => {
          return (
            <div className={style.ProductCategory}>
              <h5 className={style.topCategoryTitle}>{this.topCategory}</h5>
              <DefaultTemplate
                data={{ page_title: this.childCategory }}
                renderModules={() => {
                  return this.renderContent(match)
                }}
              />
            </div>
          )
        }}
      </Media>
    )
  }
}

export default ProductCategory
