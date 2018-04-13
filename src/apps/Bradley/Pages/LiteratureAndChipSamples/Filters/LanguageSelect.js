// @flow
import * as React from 'react'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import style from './Filters.scss'

type Languages = {
  [number | string]: string
}

type Props = {
  literature?: Array<LiteraturePost>,
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for displaying and updating the language filter
 */
class LanguageSelect extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.literature.language = event.target.value
    this.props.updateFilters(newFilters)
  }

  renderOptions (languages: Languages) {
    if (
      !this.props.literature ||
      !this.props.literature.length ||
      !Object.keys(languages).length
    ) {
      return
    }

    return Object.keys(languages).map((termId, index) => {
      return (
        <option key={index} value={termId}>
          {languages[termId]}
        </option>
      )
    })
  }

  render () {
    const languages = this.getLanguages()

    return (
      <div className={`col2 col4-tablet ${style.select} ${style.language}`}>
        <h5 className={style.title}>Language</h5>
        <select
          value={this.props.filters.literature.language}
          onChange={this.handleChange.bind(this)}>
          <option value="language">Language</option>
          {this.renderOptions(languages)}
        </select>
      </div>
    )
  }

  getLanguages () {
    const languages = {}

    if (!this.props.literature) {
      return languages
    }

    this.props.literature.forEach(literature => {
      if (!literature.terms.language || !literature.terms.language.length) {
        return
      }

      literature.terms.language.forEach(language => {
        if (!Object.keys(languages).includes(language.term_id)) {
          languages[language.term_id] = language.name
        }
      })
    })

    return languages
  }
}

export default LanguageSelect
