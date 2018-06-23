// @flow
import * as React from 'react'
import DefaultTemplate from '../../../Templates/DefaultTemplate/DefaultTemplate'
import BCorpHead from '../../../../components/BCorpHead/BCorpHead'

type Props = {
  pageTitle: string
}

const pageTitle = 'Service Parts'
const pageDescription = ''

export default class ServicePartsPage extends React.PureComponent<Props> {
  render () {
    return (
      <div className={'service-parts'}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <DefaultTemplate
          data={{
            page_title: pageTitle
          }}
          renderModules={() => {
            return (
              <React.Fragment>
                <iframe
                  id="serviceParts"
                  src="https://www.bradleycorp.com/serviceparts"
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
