// @flow
import * as React from 'react'
import DefaultTemplate from '../../../Templates/DefaultTemplate/DefaultTemplate'
import BCorpHead from '../../../../components/BCorpHead/BCorpHead'

type Props = {
  pageTitle: string
};

const pageTitle = 'Hot Water Valves'
const pageDescription = ''

export default class HotWaterValves extends React.PureComponent<Props> {
  render () {
    return (
      <div className={'technical-data-listing'}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <DefaultTemplate
          data={{
            page_title: pageTitle
          }}
          renderModules={() => {
            return (
              <React.Fragment>
                <iframe
                  id="hotWaterValves"
                  src="https://www.bradleycorp.com/navigatorvalves/tools/EFXflow.jsp"
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
