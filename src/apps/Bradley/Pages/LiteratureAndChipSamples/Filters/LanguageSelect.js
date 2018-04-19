// @flow
import * as React from 'react'
import type { LiteraturePost } from '../../../../../lib/types/cpt_types'
import type { FiltersTypes } from '../LiteratureAndChipSamples'
import { languageFilterDefault } from '../LiteratureAndChipSamples'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import style from './Filters.scss'

type Languages = {
  [number | string]: ?string
}

type Props = {
  literature?: Array<LiteraturePost>,
  filters: FiltersTypes,
  updateFilters: (newFilters: FiltersTypes) => void
}

/**
 * Class responsible for getting options for and updating the language filter
 */
class LanguageSelect extends React.Component<Props> {
  handleChange (event: SyntheticInputEvent<HTMLSelectElement>) {
    const newFilters = { ...this.props.filters }
    newFilters.literature.language = event.target.value
    this.props.updateFilters(newFilters)
  }

  render () {
    const languages: Languages = this.getLanguages()

    return (
      <BCorpSelectField
        defaultOptionId={languageFilterDefault}
        defaultOptionName={'Language'}
        options={languages}
        filterState={this.props.filters.literature.language}
        handleChange={this.handleChange.bind(this)}
        title={'Language'}
        className={`col2 col4-tablet ${style.language}`}
      />
    )
  }

  getLanguages (): Languages {
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
