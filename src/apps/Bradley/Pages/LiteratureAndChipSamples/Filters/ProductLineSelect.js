// @flow
import * as React from 'react'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import style from './Filters.scss'

type ProductLines = {
  [number | string]: ?string
}

type Props = {
  literature?: Array<LiteraturePost>,
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for getting options for and updating the product line filter
 */
class ProductLineSelect extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.literature.productLine = event.target.value
    this.props.updateFilters(newFilters)
  }

  render () {
    const productLines: ProductLines = this.getProductLines()

    return (
      <BCorpSelectField
        defaultOptionId={'0'}
        defaultOptionName={'Product Line'}
        options={productLines}
        filterState={this.props.filters.literature.productLine}
        handleChange={this.handleChange.bind(this)}
        title={'Product Line'}
        className={`col2 col4-tablet ${style.productLine}`}
      />
    )
  }

  getProductLines (): ProductLines {
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
