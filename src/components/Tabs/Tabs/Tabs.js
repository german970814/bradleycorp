import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      activeTabIndex: this.props.defaultActiveTabIndex
    }

    this.handleTabClick = this.handleTabClick.bind(this)
  }

  handleTabClick (tabIndex) {
    if (tabIndex === this.state.activeTabIndex) {
      return
    }

    this.setState({
      activeTabIndex: tabIndex
    })
  }

  // Encapsulate <Tabs/> component API as props for <Tab/> children
  renderChildrenWithTabsApiAsProps () {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === this.state.activeTabIndex,
        tabClassName: this.props.tabClassName
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
        <div className="tabs-active-content">
          {this.renderActiveTabContent()}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  defaultActiveTabIndex: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired,
  tabClassName: PropTypes.string,
  tabWrapperClassName: PropTypes.string
}

export default Tabs
