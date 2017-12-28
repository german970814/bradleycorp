import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      activeTabIndex: this.props.defaultActiveTabIndex,
      isOpen: false
    }

    this.handleTabClick = this.handleTabClick.bind(this)
    this.openCloseTab = this.openCloseTab.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ activeTabIndex: 0, isOpen: false })
  }

  handleTabClick (tabIndex) {
    this.setState({
      activeTabIndex: tabIndex,
      isOpen: this.openCloseTab(tabIndex)
    })
  }

  openCloseTab (tabIndex) {
    if (this.state.isOpen && (tabIndex === this.state.activeTabIndex)) {
      return false
    }
    return true
  }

  // Encapsulate <Tabs/> component API as props for <Tab/> children
  renderChildrenWithTabsApiAsProps () {
    return React.Children.map(this.props.children, (child, index) => {
      const tab = React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === this.state.activeTabIndex,
        tabClassName: this.props.tabClassName
      })

      // putting the tab content after the tab in the html
      if (tab.props.isActive && this.state.isOpen) {
        return [
          React.cloneElement(tab, {
            key: 0,
            isOpen: true
          }),
          (<div
            key={1}
            className={`tabs-active-content ${this.props.activeTabClassName}`}>
            {this.renderActiveTabContent()}
          </div>)
        ]
      }
      return React.cloneElement(tab, {
        isOpen: false
      })
    })
  }

  // Render current active tab content
  renderActiveTabContent () {
    const {children} = this.props
    const {activeTabIndex} = this.state
    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children
    }
  }

  render () {
    return (
      <div className={`tab-wrapper ${this.props.tabWrapperClassName}`}>
        <ul className="tabs-nav">
          {this.renderChildrenWithTabsApiAsProps()}
        </ul>
      </div>
    )
  }
}

Tabs.propTypes = {
  defaultActiveTabIndex: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
  tabClassName: PropTypes.string,
  activeTabClassName: PropTypes.string,
  tabWrapperClassName: PropTypes.string
}

export default Tabs
