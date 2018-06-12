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
  collapseOnMobile?: boolean,
  className?: string,
  labelTurnsBlackWhenChecked?: boolean,
  // from withScreenSize HOC
  screenSize: ScreenSize
}

type State = {
  checkboxes: CheckboxesType
}

class LeftSidebarCheckboxGroup extends React.Component<Props, State> {
  collapsibleClassName: string

  constructor (props: Props) {
    super(props)

    this.collapsibleClassName = this.props.collapseOnMobile
      ? style.collapsible
      : ''
  }

  handleChange (value: CheckboxObject) {
    const checkboxes = value.checkboxes
    checkboxes && this.props.updateFilters(checkboxes)
  }

  renderCheckbox () {
    return (
      <BCorpCheckboxField
        className={`${style.checkbox} ${this.props.className || ''}`}
        title={this.props.title.replace(/_/g, ' ')}
        filterState={{ checkboxes: this.props.filterState }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
        labelTurnsBlackWhenChecked={this.props.labelTurnsBlackWhenChecked}
      />
    )
  }

  renderCheckboxMobile () {
    return (
      <BCorpCheckboxField
        className={`${style.checkbox} ${this.collapsibleClassName} ${this.props
          .className || ''}`}
        filterState={{ checkboxes: this.props.filterState }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
        labelTurnsBlackWhenChecked={this.props.labelTurnsBlackWhenChecked}
      />
    )
  }

  render () {
    return this.props.screenSize === 'mobile' && this.props.collapseOnMobile ? (
      <Collapsible
        trigger={this.props.title.replace(/_/g, ' ')}
        triggerTagName={'button'}
        classParentString={`Collapsible ${style.checkBoxTitle}`}>
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
