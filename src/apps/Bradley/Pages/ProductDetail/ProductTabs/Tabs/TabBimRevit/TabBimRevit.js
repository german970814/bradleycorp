// @flow
import * as React from 'react'
import type { WPTerm } from '../../../../../../../lib/types/term_types'
import BIMRevitOption from './BIMRevitOption/BIMRevitOption'
import tabStyle from '../Tabs.scss'
import style from './TabBimRevit.scss'

type Props = {
  bimRevit: Array<WPTerm>
}

type State = {
  // well just store ids here then get the actual posts from props when we need them
  selected: Array<number>
}

class TabBimRevit extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = { selected: [] }
  }

  toggleSelect (id: number) {
    const index = this.state.selected.indexOf(id)

    if (index === -1) {
      // if it doest exist then we add it
      return this.setState({ selected: [...this.state.selected, id] })
    } else {
      // otherwise we remove it
      const selected = [...this.state.selected]
      selected.splice(index, 1)

      this.setState({ selected })
    }
  }

  selectAll () {
    const allIds = this.props.bimRevit.reduce((ids, term) => {
      return [...ids, term.term_id]
    }, [])
    this.setState({ selected: allIds })
  }

  unselectAll () {
    this.setState({ selected: [] })
  }

  renderBimRevitOptions () {
    return this.props.bimRevit.map((term, index) => {
      return (
        <BIMRevitOption
          key={index}
          term={term}
          toggleSelect={this.toggleSelect.bind(this)}
          selected={this.state.selected.includes(term.term_id)}
        />
      )
    })
  }

  renderButtons () {
    return (
      <div className={`col1 ${style.buttons}`}>
        <button
          className={`button-border-dark-gray ${style.select}`}
          onClick={this.selectAll.bind(this)}>
          {'SELECT ALL'}
        </button>
        <button
          className={`button-border-red ${style.unselect}`}
          onClick={this.unselectAll.bind(this)}>
          {'UNSELECT ALL'}
        </button>
        <button className={`${style.download}`}>{'DOWNLOAD SELECTED'}</button>
        <button className={`${style.downloadAll}`}>{'DOWNLOAD ALL'}</button>
      </div>
    )
  }

  render () {
    console.log(this.state)
    return (
      <div
        className={`row ${style.tabBimRevit} ${
          tabStyle.fullWidthColDesktopTab
        }`}>
        <ul className={tabStyle.tabColUl}>{this.renderBimRevitOptions()}</ul>
        {this.renderButtons()}
      </div>
    )
  }
}

export default TabBimRevit
