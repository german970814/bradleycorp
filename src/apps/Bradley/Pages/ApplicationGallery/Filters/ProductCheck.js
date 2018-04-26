// @flow
import * as React from 'react'
import BCorpCheckboxField from '../../../../../lib/components/BCorpFilterField/BCorpCheckboxField'

type Props = {
  filters: Object,
  options: Object,
  title: string,
  updateFilters: (newFilters: Object) => void
}

/**
 * Class responsible for getting options for and updating the product line filter
 */
class ProductCheck extends React.Component<Props> {
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const newFilters = { ...this.props.filters }
  }

  render() {
    return <BCorpCheckboxField
      title={this.props.title}
      handleChange={this.handleChange.bind(this)}
      options={this.props.options}
      showOtherField
    />
    // return (
    //   <BCorpCheckboxField
    //     defaultOptionId={productLineFilterDefault}
    //     defaultOptionName={'Product Line'}
    //     options={productLines}
    //     filterState={this.props.filters.literature.productLine}
    //     handleChange={this.handleChange.bind(this)}
    //     title={'Product Line'}
    //     className={`col2 col4-tablet ${style.productLine}`}
    //   />
    // )
  }

}

export default ProductCheck
