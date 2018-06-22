// @flow
import * as React from 'react'
import DefaultTemplate from '../../Templates/DefaultTemplate/DefaultTemplate'
import BCorpHead from '../../../components/BCorpHead/BCorpHead'

type Props = {
  pageTitle: string
}

const pageTitle = 'Where To Buy'
const pageDescription = ''

export default class WhereToBuyPage extends React.Component<Props> {
  // constructor (props: Props) {
  //   super(props)

  //   // this.state = {}
  // }

  render () {
    return (
      <div className={'where-to-buy'}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <DefaultTemplate
          data={{
            page_title: pageTitle
          }}
          renderModules={() => {
            return (
              <React.Fragment>
                <iframe
                  id="locatorIframe"
                  src="http://forms.bradleydev.twoxfour.com/where-to-buy/index.html"
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
