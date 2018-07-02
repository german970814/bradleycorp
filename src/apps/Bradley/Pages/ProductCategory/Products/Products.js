// @flow
import * as React from 'react'
import type { ActiveFilterType } from '../ProductCategory'
import type { ScreenSize } from '../../../../../lib/contexts/ScreenSizeContext'
import type { BCorpPost } from '../../../../../lib/types/post_types'
import debounce from 'debounce'
import CPTApiClient from '../../../../../api/cpt_client'
import { sortIntoRows } from '../../../../../lib/bcorpJSX'
import Loading from '../../../../../lib/components/Loading/Loading'
import NoResults from '../../../../../lib/components/Error/NoResults/NoResults'
import ProductScrollerProduct from '../../../../../lib/containers/ProductScroller/ProductScrollerProduct/ProductScrollerProduct'
import style from './Products.scss'

type Props = {
  catSlug: string,
  catParents: Array<string>,
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
  productsNode: ?HTMLDivElement
  productsMinHeight: ?number

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

    this.updateMinHeight()
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
    return (
      <div className={style.products} ref={node => (this.productsNode = node)}>
        {this.state.loading ? <Loading /> : this.renderProducts()}
      </div>
    )
  }

  async getFilteredProducts () {
    this.setState({ loading: true })

    try {
      const nestedTaxQuery = this.buildNestedTaxQuery()
      const metaQuery = this.buildMetaQuery()

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

    const parentSlugs = this.props.catParents
    // console.log( [...parentSlugs, this.props.catSlug] )
    const nestedTaxQuery = {
      relation: 'AND',
      queries: [
        {
          tax: 'product_category',
          // parentSlugs should include catSlug,
          // but just in case we add it anyway
          slugs: [...parentSlugs, this.props.catSlug],
          operator: 'AND'
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
          key: 'product_new_until_unix',
          value: Date.now(),
          compare: '<',
          type: 'numeric'
        }
      ]
    }

    if (metaFilters && metaFilters.product_attributes) {
      const activeAttributes = metaFilters.product_attributes

      Object.keys(activeAttributes).forEach(attName => {
        activeAttributes[attName].forEach(attValue => {
          metaQuery = [
            ...metaQuery,
            {
              key: 'product_attributes',
              value: attValue,
              compare: 'LIKE'
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

  updateMinHeight (): void {
    if (!this.productsNode) {
      return
    }
    const { productsNode } = this

    const height = productsNode.getBoundingClientRect().height

    if (height > (this.productsMinHeight || 0)) {
      // update the min height,
      // this will only ever increase as a new max height is reached
      productsNode.style.minHeight = `${height}px`
      // keep track of the last set min height
      // so we dont always have to process the min height from the node to compare it to a number
      this.productsMinHeight = height
    }
  }
}

export default Products
