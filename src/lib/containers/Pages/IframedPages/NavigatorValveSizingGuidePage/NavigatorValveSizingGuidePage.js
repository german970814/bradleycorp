// @flow
import * as React from 'react'
import DefaultTemplate from '../../../Templates/DefaultTemplate/DefaultTemplate'
import BCorpHead from '../../../../components/BCorpHead/BCorpHead'

type Props = {
  pageTitle: string
}

const pageTitle = 'Navigator Valve Sizing Guide'
const pageDescription = ''

export default class NavigatorValveSizingGuidePage extends React.PureComponent<
  Props
> {
  render () {
    return (
      <div className={'navigator-valve-sizing-guide'}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <DefaultTemplate
          data={{
            page_title: pageTitle
          }}
          renderModules={() => {
            return (
              <React.Fragment>
                <iframe
                  id="navigatorValveSizingGuide"
                  src="https://www.bradleycorp.com/navigatorvalves/sizing-guide"
                  width="100%"
                  height="800"
                  frameBorder="0"
                />
              </React.Fragment>
            )
          }}
        />
      </div>
    )
  }
}
