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
    const termIds = this.props.bimRevit.map(term => {
      return term.name
    })

    return (
      <div className={tabStyle.fullWidthColDesktopTab}>
        <BimRevitDownloader bimRevitTermIds={termIds} />
      </div>
    )
  }
}

export default TabBimRevit
