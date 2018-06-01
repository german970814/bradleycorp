// @flow
import * as React from 'react'
import type { WPTerm } from '../../../../../../../lib/types/term_types'
import BimRevitDownloader from '../../../../../../../lib/containers/BIMRevitDownloader/BimRevitDownloader'
import tabStyle from '../Tabs.scss'

type Props = {
  bimRevit: Array<WPTerm>
}

class TabBimRevit extends React.Component<Props> {
  render () {
    return (
      <div className={tabStyle.fullWidthColDesktopTab}>
        <BimRevitDownloader bimRevit={this.props.bimRevit} />
      </div>
    )
  }
}

export default TabBimRevit
