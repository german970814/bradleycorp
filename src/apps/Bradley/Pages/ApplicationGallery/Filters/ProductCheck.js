// @flow
import * as React from 'react'
import BCorpCheckboxField from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import type { Options } from './Filters'
import type { CheckboxObject } from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'
import type { FiltersType } from '../ApplicationGallery'
import Collapsible from 'react-collapsible'
import { MOBILEMAXWIDTH } from '../../../../../globals'
import Media from 'react-media'
import style from './Filters.scss'

type Props = {
  options: Options,
  title: string,
  updateFilters: (newFilters: FiltersType) => void
}

type State = {
  checkboxes: FiltersType
}

/**
 * Class responsible for getting options for and updating the product line filter
 */
class ProductCheck extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      checkboxes: []
    }
  }

  handleChange (value: CheckboxObject) {
    const checkboxes = value.checkboxes
    this.setState({ checkboxes })
    checkboxes && this.props.updateFilters(checkboxes)
  }

  renderCheckbox () {
    return (
      <BCorpCheckboxField
        title={this.props.title.replace(/_/g, ' ')}
        filterState={{ checkboxes: this.state.checkboxes }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
      />
    )
  }

  renderCheckboxMobile () {
    return (
      <BCorpCheckboxField
        filterState={{ checkboxes: this.state.checkboxes }}
        handleChange={this.handleChange.bind(this)}
        options={this.props.options}
      />
    )
  }

  render () {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            // mobile
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
      </Media>
    )
  }
}

export default ProductCheck
