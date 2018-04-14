// @flow
import * as React from 'react'
import type {
  OptionsTypes,
  FiltersTypes,
  PostTypeOptions
} from '../LiteratureAndChipSamples'
import {
  productLineFilterDefault,
  languageFilterDefault,
  materialTypeFilterDefault
} from '../LiteratureAndChipSamples'
import { filterPostsByTerm } from '../../../../../lib/bcorpPost'

type Props = {
  options: OptionsTypes,
  filters: FiltersTypes,
  selected: PostTypeOptions
}

/**
 * Class responsible for applying the filters to and rendering the options
 */
class Options extends React.Component<Props> {
  renderLiterature () {
    let literature = this.props.options.literature

    if (!literature || !literature.length) {
      return null
    }

    if (
      this.props.filters.literature.productLine !== productLineFilterDefault
    ) {
      literature = filterPostsByTerm(
        literature,
        'product_line',
        this.props.filters.literature.productLine
      )

      if (!literature || !literature.length) {
        return null
      }
    }

    if (this.props.filters.literature.language !== languageFilterDefault) {
      literature = filterPostsByTerm(
        literature,
        'language',
        this.props.filters.literature.language
      )
    }

    return literature && literature.length
      ? literature.map((literature, index) => {
        return <div key={index}>{literature.post.post_title}</div>
      })
      : null
  }

  renderChipSamples () {
    let chipSamples = this.props.options.chipSamples

    if (!chipSamples || !chipSamples.length) {
      return null
    }

    if (
      this.props.filters.chipSamples.materialType !== materialTypeFilterDefault
    ) {
      chipSamples = filterPostsByTerm(
        chipSamples,
        'material_type',
        this.props.filters.chipSamples.materialType
      )
    }

    return chipSamples && chipSamples.length
      ? chipSamples.map((chipSamples, index) => {
        return <div key={index}>{chipSamples.post.post_title}</div>
      })
      : null
  }

  render () {
    return this.props.selected === 'literature'
      ? this.renderLiterature()
      : this.renderChipSamples()
  }
}

export default Options
