// @flow
import * as React from 'react'
import Tab from '../Tab/Tab'
import style from './Tabs.scss'

type Props = {
  defaultActiveTabIndex: number,
  children: Array<React.Element<typeof Tab> | null>,
  tabClassName?: string,
  activeTabClassName?: string,
  tabWrapperClassName?: string,
  tabsUlClassName?: string
}

type State = {
  activeTabIndex: number,
  isOpen: boolean
}

class Tabs extends React.Component<Props, State> {
  handleTabClick: (tabIndex: number) => void
  openCloseTab: (tabIndex: number) => void

  constructor (props: Props) {
    super(props)

    this.state = {
      activeTabIndex: this.props.defaultActiveTabIndex,
      isOpen: false
    }

    this.handleTabClick = this.handleTabClick.bind(this)
    this.openCloseTab = this.openCloseTab.bind(this)
  }

  static getDerivedStateFromProps (nextProps: Props) {
    return {
      activeTabIndex: nextProps.defaultActiveTabIndex,
      isOpen: false
    }
  }

  handleTabClick (tabIndex: number) {
    this.setState({
      activeTabIndex: tabIndex,
      isOpen: this.openCloseTab(tabIndex)
    })
  }

  openCloseTab (tabIndex: number) {
    if (this.state.isOpen && tabIndex === this.state.activeTabIndex) {
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
          <div
            key={1}
            className={`tabs-active-content ${style.activeTabContent} ${this
              .props.activeTabClassName || ''}`}>
            {this.renderActiveTabContent()}
          </div>
        ]
      }
      return React.cloneElement(tab, {
        isOpen: false
      })
    })
  }

  // Render current active tab content
  renderActiveTabContent (): React.Node {
    const { children } = this.props
    const { activeTabIndex } = this.state
    if (
      children[activeTabIndex] &&
      children[activeTabIndex].props &&
      children[activeTabIndex].props.children
    ) {
      return children[activeTabIndex].props.children
    } else {
      return null
    }
  }

  render () {
    return (
      <div
        className={`tab-wrapper ${style.tabWrapper} ${this.props
          .tabWrapperClassName || ''}`}>
        <ul
          className={`tab-nav ${style.tabsUl} ${this.props.tabsUlClassName ||
            ''}`}>
          {this.renderChildrenWithTabsApiAsProps()}
        </ul>
      </div>
    )
  }
}

export default Tabs
