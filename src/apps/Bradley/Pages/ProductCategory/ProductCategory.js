// @flow
import * as React from 'react'
import type { Match } from 'react-router-dom'
import type { ScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import type { TreeType } from '../../../../lib/types/response_types'
import { withScreenSize } from '../../../../lib/contexts/ScreenSizeContext'
import { createBreadcrumbsObjectFromTermTree } from '../../../../lib/components/Breadcrumbs/Breadcrumbs'
import ProductApiClient from '../../../../api/product_client'
import CategoryDescription from './CategoryDescription/CategoryDescription'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import Pagination from './Pagination/Pagination'
import Filters from './Filters/Filters'
import Products from './Products/Products'
import Breadcrumbs from '../../../../lib/components/Breadcrumbs/Breadcrumbs'
import Loading from '../../../../lib/components/Loading/Loading'
import style from './ProductCategory.scss'

type CategoryData = {|
  parent_name?: string,
  name: string,
  description?: string,
  count: number,
  featured_image: string
|}

type ProductAttributesType = {
  // attribute name
  [string]: {
    // attribute value: count
    [string]: number
  }
}

type MetaFilterGroup = {
  product_new_until?: number,
  product_attributes?: ProductAttributesType
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
  metaFilters?: {
    product_attributes?: {
      [string]: Array<string>
    },
    other?: Array<string>
  },
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
  tree: TreeType,
  numberResults: number,
  paged: number,
  showFiltersMobile: boolean,
  loading: boolean
}

export const allCategoriesSlug = 'all-categories'

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
        metaFilters: {},
        taxFilters: {}
      },
      tree: {
        children: false,
        parents: false
      },
      numberResults: 0,
      paged: 1,
      showFiltersMobile: false,
      loading: true
    }

    this.postsPerPage = 20
    /* this.categoryLinks = [
      { name: 'link title goes right here', link: '#' },
      { name: 'link title goes right here', link: '#' }
    ] */
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

    if (prevState.activeFilters !== this.state.activeFilters) {
      this.updatePaged(1)
    }
  }

  toggleShowFiltersMobile () {
    this.setState({ showFiltersMobile: !this.state.showFiltersMobile })
  }

  updateNumberResults (numberResults: number) {
    this.setState({ numberResults })
  }

  updatePaged (paged: number) {
    this.setState({ paged })
  }

  updateMetaProductAttributesActiveFilters (
    attName: string,
    newValues: Array<string>
  ) {
    const newProductAttributes = this.state.activeFilters.metaFilters
      ? {
        ...this.state.activeFilters.metaFilters.product_attributes
      }
      : {}
    newProductAttributes[attName] = newValues

    return this.setState({
      activeFilters: {
        ...this.state.activeFilters,
        metaFilters: {
          ...this.state.activeFilters.metaFilters,
          product_attributes: newProductAttributes
        }
      }
    })
  }

  updateMetaOtherActiveFilters (newFilters: Array<string>) {
    return this.setState({
      activeFilters: {
        ...this.state.activeFilters,
        metaFilters: {
          ...this.state.activeFilters.metaFilters,
          other: newFilters
        }
      }
    })
  }

  updateTaxActiveFilters (tax: string, newFilters: Array<string>) {
    const newTaxFilters = { ...this.state.activeFilters.taxFilters }

    if (
      tax === 'product_category' &&
      this.state.categoryData &&
      this.state.categoryData.name
    ) {
      const index = newFilters.indexOf(this.state.categoryData.name)

      newFilters = index !== -1 ? newFilters.splice(index, 1) : newFilters
    }

    newTaxFilters[tax] = newFilters

    this.setState({
      ...this.state,
      activeFilters: {
        ...this.state.activeFilters,
        taxFilters: newTaxFilters
      }
    })
  }

  renderFilters () {
    return (
      <div className={`col1 col4-tablet ${style.sidebar}`}>
        <Filters
          catParentTitle={
            (this.state.categoryData && this.state.categoryData.parent_name) ||
            ''
          }
          catSlug={
            (this.state.categoryData && this.state.categoryData.name) || ''
          }
          filters={this.state.filters}
          activeFilters={this.state.activeFilters}
          tree={this.state.tree}
          updateMetaOtherActiveFilters={this.updateMetaOtherActiveFilters.bind(
            this
          )}
          updateMetaProductAttributesActiveFilters={this.updateMetaProductAttributesActiveFilters.bind(
            this
          )}
          updateTaxActiveFilters={this.updateTaxActiveFilters.bind(this)}
        />
      </div>
    )
  }

  renderContent () {
    const isMobile = this.props.screenSize === 'mobile'

    // add all categories to tree for breadcrumbs
    // we dont do this for the filters because
    // the all categories link actually gets displayed outside the flow
    const extraParents = {}
    extraParents[allCategoriesSlug] = 'All Categories'
    const tree = {
      children: false,
      parents: {
        ...extraParents,
        ...(this.state.tree.parents || {})
      }
    }

    return (
      <div className={`row ${style.content}`}>
        {!isMobile && (
          <div className={`col1 ${style.breadcrumbs}`}>
            <Breadcrumbs
              breadcrumbs={createBreadcrumbsObjectFromTermTree(
                tree,
                'product_category'
              )}
            />
          </div>
        )}

        <CategoryDescription
          isMobile={isMobile}
          description={
            (this.state.categoryData && this.state.categoryData.description) ||
            ''
          }
          logoSrc={
            (this.state.categoryData &&
              this.state.categoryData.featured_image) ||
            ''
          }
        />

        {this.props.screenSize !== 'mobile' && this.renderFilters()}

        <div className={`col1 col4x3-tablet ${style.products}`}>
          <Pagination
            paged={this.state.paged}
            updatePaged={this.updatePaged.bind(this)}
            postsPerPage={this.postsPerPage}
            numPosts={this.state.numberResults}
            isMobile={isMobile}
          />

          {this.props.screenSize === 'mobile' && (
            <button
              className={style.showFilters}
              onClick={this.toggleShowFiltersMobile.bind(this)}>
              {this.state.showFiltersMobile ? 'SHOW RESULTS' : 'FILTER RESULTS'}
            </button>
          )}

          {this.props.screenSize !== 'mobile' ||
          (this.props.screenSize === 'mobile' &&
            !this.state.showFiltersMobile) ? (
              <Products
                catSlug={this.props.match.params.slug || ''}
                activeFilters={this.state.activeFilters}
                paged={this.state.paged}
                postsPerPage={this.postsPerPage}
                updateNumberResults={this.updateNumberResults.bind(this)}
                screenSize={this.props.screenSize}
              />
            ) : (
              <div className={'row'}>{this.renderFilters()}</div>
            )}

          <Pagination
            paged={this.state.paged}
            updatePaged={this.updatePaged.bind(this)}
            postsPerPage={this.postsPerPage}
            numPosts={this.state.numberResults}
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
      newState.filters = this.unwrapFiltersFromResponse(response.data.filters)
      newState.tree = response.data.tree
      newState.loading = false
      newState.numberResults =
        (response.data.category_data && response.data.category_data.count) || 0

      return this.setState(newState)
    } catch (error) {
      console.log(error)
    }
  }

  unwrapFiltersFromResponse (responseFilters): FiltersType {
    let filters = false

    if (responseFilters.meta_filters || responseFilters.tax_filters) {
      filters = {}

      filters.metaFilters = responseFilters.meta_filters
      filters.taxFilters = responseFilters.tax_filters
    }

    return filters
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
