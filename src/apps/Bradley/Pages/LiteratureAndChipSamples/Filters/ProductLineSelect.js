// @flow
import * as React from 'react'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import style from './Filters.scss'

type ProductLine = {
  [number | string]: string
}

type Props = {
  literature?: Array<LiteraturePost>,
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the product line filter
 */
class ProductLineSelect extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.literature.productLine = event.target.value
    this.props.updateFilters(newFilters)
  }

  renderOptions (productLines: ProductLine) {
    if (
      !this.props.literature ||
      !this.props.literature.length ||
      !Object.keys(productLines).length
    ) {
      return
    }

    return Object.keys(productLines).map((termId, index) => {
      return (
        <option key={index} value={termId}>
          {productLines[termId]}
        </option>
      )
    })
  }

  render () {
    const productLines = this.getProductLines()

    return (
      <div className={`col2 col4-tablet ${style.select} ${style.productLine}`}>
        <h5 className={style.title}>Product Line</h5>
        <select
          value={this.props.filters.literature.productLine}
          onChange={this.handleChange.bind(this)}>
          <option value="product-line">Product Line</option>
          {this.renderOptions(productLines)}
        </select>
      </div>
    )
  }

  getProductLines () {
    const productLines = {}

    if (!this.props.literature) {
      return productLines
    }

    this.props.literature.forEach(literature => {
      if (
        !literature.terms.product_line ||
        !literature.terms.product_line.length
      ) {
        return
      }

      literature.terms.product_line.forEach(productLine => {
        if (!Object.keys(productLines).includes(productLine.term_id)) {
          productLines[productLine.term_id] = productLine.name
        }
      })
    })

    return productLines
  }
}

export default ProductLineSelect
