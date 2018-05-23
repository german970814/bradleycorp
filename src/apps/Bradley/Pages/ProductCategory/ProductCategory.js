// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { ScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import { withScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import ProductApiClient from '../../../../api/product_client'
import CategoryDescription from './CategoryDescription/CategoryDescription'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import Pagination from './Pagination/Pagination'
import Filters from './Filters/Filters'
import Products from './Products/Products'
import Loading from '../../../../lib/components/Loading/Loading'
import style from './ProductCategory.scss'

type CategoryData = {|
  parent_name?: string,
  name: string,
  description?: string,
  count: number
|}

type MetaFilterGroup = {
  [string]: number
}

type TaxFilterGroup = {
  [string]: {
    name: string,
    terms: {
      [string]: {
        name: string,
        count: number
      }
    }
  }
}

type FiltersType =
  | {
      metaFilters: MetaFilterGroup,
      taxFilters: TaxFilterGroup
    }
  | false

type ActiveFilterType = {
  metaFilters?: Array<string>,
  taxFilters: {
    [string]: ?Array<string>
  }
}

type Props = {
  match: Match,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  categoryData: CategoryData | false,
  filters: FiltersType,
  activeFilters: ActiveFilterType,
  paged: number,
  showFiltersMobile: boolean,
  loading: boolean
}

class ProductCategory extends React.Component<Props, State> {
  postsPerPage: number
  childCategory: string
  topCategory: string
  categoryDescription: string
  categoryLinks: Array<{ name: string, link: string }>

  constructor (props: Props) {
    super(props)

    this.state = {
      categoryData: false,
      filters: false,
      activeFilters: {
        metaFilters: [],
        taxFilters: {}
      },
      paged: 0,
      showFiltersMobile: false,
      loading: true
    }

    this.postsPerPage = 4
    this.categoryLinks = [
      { name: 'link title goes right here', link: '#' },
      { name: 'link title goes right here', link: '#' }
    ]
  }

  componentDidMount () {
    this.getProductCategoryPageData()
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (
      prevProps.match.params.slug &&
      this.props.match.params.slug &&
      prevProps.match.params.slug !== this.props.match.params.slug
    ) {
      this.getProductCategoryPageData()
    }
  }

  updatePaged (paged: number) {
    this.setState({ paged })
  }

  updateMetaActiveFilters (newFilters: Array<string>) {
    return this.setState({
      ...this.state,
      activeFilters: {
        ...this.state.activeFilters,
        metaFilters: newFilters
      }
    })
  }

  updateTaxActiveFilters (tax: string, newFilters: Array<string>) {
    const newTaxFilters = { ...this.state.activeFilters.taxFilters }
    newTaxFilters[tax] = newFilters

    this.setState({
      ...this.state,
      activeFilters: {
        ...this.state.activeFilters,
        taxFilters: newTaxFilters
      }
    })
  }

  renderContent () {
    const isMobile = this.props.screenSize === 'mobile'

    return (
      <div className={`row ${style.content}`}>
        <CategoryDescription
          isMobile={isMobile}
          links={this.categoryLinks}
          description={
            (this.state.categoryData && this.state.categoryData.description) ||
            ''
          }
          logoSrc={
            'http://bradleydev.twoxfour.com/wp-content/uploads/2018/01/halo-web-icon@3x.png'
          }
        />

        <div className={`col1 col4-tablet ${style.sidebar}`}>
          <Filters
            catParentTitle={
              (this.state.categoryData &&
                this.state.categoryData.parent_name) ||
              ''
            }
            filters={this.state.filters}
            activeFilters={this.state.activeFilters}
            updateMetaActiveFilters={this.updateMetaActiveFilters.bind(this)}
            updateTaxActiveFilters={this.updateTaxActiveFilters.bind(this)}
          />
        </div>

        <div className={`col1 col4x3-tablet ${style.products}`}>
          <Pagination
            paged={this.state.paged}
            updatePaged={this.updatePaged.bind(this)}
            postsPerPage={this.postsPerPage}
            numPosts={
              (this.state.categoryData && this.state.categoryData.count) || 0
            }
            isMobile={isMobile}
          />
          <Products
            catSlug={this.props.match.params.slug || ''}
            activeFilters={this.state.activeFilters}
            paged={this.state.paged}
            postsPerPage={this.postsPerPage}
            screenSize={this.props.screenSize}
          />
          <Pagination
            paged={this.state.paged}
            updatePaged={this.updatePaged.bind(this)}
            postsPerPage={this.postsPerPage}
            numPosts={
              (this.state.categoryData && this.state.categoryData.count) || 0
            }
            isMobile={isMobile}
          />
        </div>
      </div>
    )
  }

  render () {
    console.log(this.state)

    if (!this.state.categoryData || this.state.loading) {
      return <Loading />
    }
    const { categoryData } = this.state

    return (
      <div className={style.ProductCategory}>
        {categoryData.parent_name && (
          <h5 className={style.topCategoryTitle}>{categoryData.parent_name}</h5>
        )}
        <DefaultTemplate
          data={{ page_title: categoryData.name }}
          renderModules={() => {
            return this.renderContent()
          }}
        />
      </div>
    )
  }

  async getProductCategoryPageData () {
    this.setState({ loading: true })
    try {
      const slug = this.props.match.params.slug || ''
      const client = new ProductApiClient()
      const response = await client.getProductCategoryPage(slug)

      const newState = {}
      newState.categoryData = response.data.category_data
      newState.filters = response.data.filters
        ? {
          metaFilters: response.data.filters.meta_filters,
          taxFilters: response.data.filters.tax_filters
        }
        : false
      newState.loading = false

      return this.setState(newState)
    } catch (error) {
      console.log(error)
    }
  }
}

export default withScreenSize(ProductCategory)
export type {
  CategoryData,
  FiltersType,
  ActiveFilterType,
  TaxFilterGroup,
  MetaFilterGroup
}
