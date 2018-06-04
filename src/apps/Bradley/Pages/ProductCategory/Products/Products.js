// @flow
import * as React from 'react'
import type { ActiveFilterType } from '../ProductCategory'
import type { ScreenSize } from '../../../../../lib/contexts/ScreenSizeContext'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import debounce from 'debounce'
import CPTApiClient from '../../../../../api/cpt_client'
import { filterPostsByMeta } from '../../../../../lib/bcorpPost'
import { sortIntoRows } from '../../../../../lib/bcorpJSX'
import Loading from '../../../../../lib/components/Loading/Loading'
import NoResults from '../../../../../lib/components/NoResults/NoResults'
import ProductScrollerProduct from '../../../../../lib/containers/ProductScroller/ProductScrollerProduct/ProductScrollerProduct'
import style from './Products.scss'

type Props = {
  catSlug: string,
  activeFilters: ActiveFilterType,
  paged: number,
  postsPerPage: number,
  updateNumberResults: (numberResults: number) => void,
  screenSize: ScreenSize
}

type State = {
  products: Array<BCorpPost>,
  loading: boolean
}

class Products extends React.Component<Props, State> {
  getFilteredProductsDebounced: () => void

  constructor (props: Props) {
    super(props)

    this.state = {
      products: [],
      loading: true
    }

    this.getFilteredProductsDebounced = debounce(
      this.getFilteredProducts.bind(this),
      1000
    )
  }

  componentDidMount () {
    this.getFilteredProducts()
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    if (this.shouldResendRequest(prevProps)) {
      this.setState({ loading: true })
      this.getFilteredProductsDebounced()
    }
  }

  renderProducts () {
    const args = {
      col: 'col2',
      numInEachRow: 2
    }

    if (this.props.screenSize === 'tablet') {
      args.col = 'col3'
      args.numInEachRow = 3
    }
    if (this.props.screenSize === 'desktop') {
      args.col = 'col5'
      args.numInEachRow = 5
    }

    const products = this.state.products.map((product, index) => {
      return (
        <ProductScrollerProduct
          key={index}
          className={`${args.col} ${style.product}`}
          product={product}
        />
      )
    })

    return products.length && products.length !== 0 ? (
      sortIntoRows(products, args.numInEachRow)
    ) : (
      <NoResults
        className={style.noResults}
        message={'No products matched your filter selections'}
      />
    )
  }

  render () {
    return this.state.loading ? (
      <Loading />
    ) : (
      <div className={style.products}>{this.renderProducts()}</div>
    )
  }

  async getFilteredProducts () {
    this.setState({ loading: true })

    try {
      const nestedTaxQuery = this.buildNestedTaxQuery()
      const metaQuery = this.buildMetaQuery()

      console.log('sending', nestedTaxQuery, metaQuery, this.props.paged)

      const client = new CPTApiClient('product')
      const response = await client.getByMetaAndTaxQuery(
        nestedTaxQuery,
        metaQuery,
        'OR',
        this.props.postsPerPage,
        this.props.paged,
        undefined,
        null,
        '',
        true
      )

      console.log(response)

      const products = response.data.posts

      this.setState({ products, loading: false })
      this.props.updateNumberResults(response.data.found_posts)
    } catch (error) {
      console.log(error)
      this.setState({ products: [], loading: false })
      this.props.updateNumberResults(0)
    }
  }

  buildNestedTaxQuery () {
    const taxFilters = { ...this.props.activeFilters.taxFilters }

    let filterQueries = []

    Object.keys(taxFilters).forEach(taxName => {
      if (taxFilters[taxName].length) {
        filterQueries = [
          ...filterQueries,
          {
            tax: taxName,
            slugs: taxFilters[taxName]
          }
        ]
      }
    })

    const nestedTaxQuery = {
      relation: 'AND',
      queries: [
        {
          tax: 'product_category',
          slugs: [this.props.catSlug]
        },
        {
          relation: 'OR',
          queries: filterQueries
        }
      ]
    }

    return nestedTaxQuery
  }

  buildMetaQuery () {
    const { metaFilters } = this.props.activeFilters
    let metaQuery = []

    if (
      metaFilters &&
      metaFilters.other &&
      metaFilters.other.includes('product_new_until')
    ) {
      metaQuery = [
        ...metaQuery,
        {
          key: 'product_new_until',
          value: new Date(),
          compare: '>',
          type: 'DATETIME'
        }
      ]
    }

    if (metaFilters && metaFilters.product_attributes) {
      const activeAttributes = metaFilters.product_attributes

      Object.keys(activeAttributes).forEach(attName => {
        activeAttributes[attName].forEach(attValue => {
          const value = {}
          value[attName] = attValue

          metaQuery = [
            ...metaQuery,
            {
              key: 'product_attributes',
              value: value,
              compare: 'IN'
            }
          ]
        })
      })
    }

    return metaQuery
  }

  shouldResendRequest (prevProps: Props) {
    if (
      prevProps.catSlug !== this.props.catSlug ||
      prevProps.paged !== this.props.paged ||
      prevProps.postsPerPage !== this.props.postsPerPage
    ) {
      return true
    }
    // sees if the active filters have changed from false to an object
    // and checks for shallow changes
    if (prevProps.activeFilters !== this.props.activeFilters) {
      return true
    }

    // if its an object thats changed we check the tax filters for a change
    if (
      Object.keys(prevProps.activeFilters.taxFilters).some(filter => {
        return (
          prevProps.activeFilters.taxFilters[filter] !==
          this.props.activeFilters.taxFilters[filter]
        )
      })
    ) {
      return true
    }

    if (
      prevProps.activeFilters.metaFilters !==
      this.props.activeFilters.metaFilters
    ) {
      return true
    }

    return false
  }
}

export default Products
