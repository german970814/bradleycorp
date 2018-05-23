// @flow
import * as React from 'react'
import type { ScreenSize } from '../../../contexts/ScreenSizeContext'
import type { CheckboxObject, CheckboxesType } from '../BCorpCheckboxField'
import type { WPTerm } from '../../../types/term_types'
import Collapsible from 'react-collapsible'
import { withScreenSize } from '../../../contexts/ScreenSizeContext'
import BCorpCheckboxField from '../BCorpCheckboxField'
import style from './LeftSidebarCheckboxGroup.scss'

type Options = {
  [string]: ?string
}

type Props = {
  options: Options,
  title: string,
  filterState: CheckboxesType,
  updateFilters: (newFilters: CheckboxesType) => void,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  checkboxes: CheckboxesType
}

class LeftSidebarCheckboxGroup extends React.Component<Props, State> {
  handleChange (value: CheckboxObject) {
    const checkboxes = value.checkboxes
    checkboxes && this.props.updateFilters(checkboxes)
  }

  renderCheckbox () {
    return (
      <BCorpCheckboxField
        title={this.props.title.replace(/_/g, ' ')}
        filterState={{ checkboxes: this.props.filterState }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
      />
    )
  }

  renderCheckboxMobile () {
    return (
      <BCorpCheckboxField
        filterState={{ checkboxes: this.props.filterState }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
      />
    )
  }

  render () {
    return this.props.screenSize === 'mobile' ? (
      <Collapsible
        trigger={this.props.title.replace(/_/g, ' ')}
        triggerTagName={'button'}
        classParentString={`Collapsible ${style.checkBoxTitle}`}
        triggerStyle={{
          color: '#a7a9ac',
          fontSize: '13px',
          fontWeight: '300',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
        {this.renderCheckboxMobile()}
      </Collapsible>
    ) : (
      this.renderCheckbox()
    )
  }
}

export function getOptionsFromArrayOfTerms (terms: Array<WPTerm>) {
  const object: Options = {}
  terms.forEach(el => {
    object[el.slug.toString()] = el.name
  })
  return object
}

export default withScreenSize(LeftSidebarCheckboxGroup)
