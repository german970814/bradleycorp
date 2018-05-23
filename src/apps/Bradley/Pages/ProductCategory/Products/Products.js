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
      const taxArgs = this.combineProductCatAndFilters()

      console.log('sending', taxArgs, this.props.paged)

      const client = new CPTApiClient('product')
      const response = await client.getByTaxNameAndTermSlugObject(
        taxArgs,
        'OR',
        this.props.postsPerPage,
        this.props.paged
      )

      let products = response.data

      // filter each meta value from returned products
      if (
        this.props.activeFilters.metaFilters &&
        this.props.activeFilters.metaFilters.includes('product_new_until')
      ) {
        products = filterPostsByMeta(
          products,
          'product_new_until',
          'now',
          'DATEBEFORE'
        )
      }

      this.setState({ products, loading: false })
    } catch (error) {
      console.log(error)
      this.setState({ products: [], loading: false })
    }
  }

  combineProductCatAndFilters () {
    const taxArgs = this.props.activeFilters.taxFilters

    if (taxArgs['product_category']) {
      // if we already have product category filters
      // we just want to add our actual top level filter
      taxArgs['product_category'] = [
        ...taxArgs['product_category'],
        this.props.catSlug
      ]
    } else {
      taxArgs['product_category'] = [this.props.catSlug]
    }

    return taxArgs
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
