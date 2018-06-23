// @flow
import * as React from 'react'
import DefaultTemplate from '../../../Templates/DefaultTemplate/DefaultTemplate'
import BCorpHead from '../../../../components/BCorpHead/BCorpHead'

type Props = {
  pageTitle: string
}

const pageTitle = 'Bim Revit'
const pageDescription = ''

export default class BimRevitPage extends React.PureComponent<Props> {
  render () {
    return (
      <div className={'bim-revit'}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <DefaultTemplate
          data={{
            page_title: pageTitle
          }}
          renderModules={() => {
            return (
              <React.Fragment>
                <iframe
                  id="bimRevit"
                  src="https://www.bradleycorp.com/bim"
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
