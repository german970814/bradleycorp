// @flow
import * as React from 'react'
import BCorpSelectField from '../../../../../lib/components/BCorpFilterField/BCorpSelectField'
import style from './Pagination.scss'

type Props = {
  paged: number,
  updatePaged: (paged: number) => void,
  postsPerPage: number,
  numPosts: number,
  isMobile: boolean
}

type State = {
  paged: number
}

class Pagination extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      paged: props.paged
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    return {
      paged: nextProps.paged
    }
  }

  updatePagedState (event: SyntheticInputEvent<HTMLSelectElement>) {
    if (this.props.isMobile) {
      return this.props.updatePaged(parseInt(event.target.value))
    } else {
      this.setState({ paged: parseInt(event.target.value) })
    }
  }

  updateProductCategoryPagedState () {
    this.props.updatePaged(this.state.paged)
  }

  renderShowing () {
    return (
      <h6
        className={`col2 ${
          style.showing
        }`}>{`Showing ${this.getNumbersShown()} of ${this.props.numPosts}`}</h6>
    )
  }

  renderDropdown () {
    const dropdownOptions = this.getDropdownOptions()
    delete dropdownOptions[this.state.paged]

    return (
      <div className={`col2 ${style.dropdownWrapper}`}>
        {!this.props.isMobile && (
          <div className={style.buttonWrapper}>
            <button onClick={this.updateProductCategoryPagedState.bind(this)}>
              {'GO'}
            </button>
          </div>
        )}
        <BCorpSelectField
          className={`${style.select}`}
          defaultOptionId={this.state.paged}
          defaultOptionName={`Show ${this.getPageRange(this.state.paged)}`}
          options={dropdownOptions}
          filterState={this.state.paged}
          handleChange={this.updatePagedState.bind(this)}
        />
      </div>
    )
  }

  render () {
    return (
      <div className={`row ${style.Pagination}`}>
        {this.renderShowing()}
        {this.renderDropdown()}
      </div>
    )
  }

  getNumbersShown (): string {
    const { paged } = this.props
    return this.getPageRange(paged)
  }

  getDropdownOptions () {
    const numPages = Math.ceil(this.props.numPosts / this.props.postsPerPage)

    const options = {}

    for (let page = 1; page <= numPages; page++) {
      options[page] = `Show ${this.getPageRange(page)}`
    }

    return options
  }

  getPageRange (paged: number) {
    return `${this.getPageStart(paged)}-${this.getPageEnd(paged)}`
  }

  getPageStart (paged: number) {
    return (paged - 1) * this.props.postsPerPage + 1
  }

  getPageEnd (paged: number) {
    const pageEnd = paged * this.props.postsPerPage
    return pageEnd > this.props.numPosts ? this.props.numPosts : pageEnd
  }
}

export default Pagination
