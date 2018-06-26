// @flow
import * as React from 'react'
import DefaultTemplate from '../../Templates/DefaultTemplate/DefaultTemplate'
import HubspotForms from '../../HubspotForms/HubspotForms'
import BCorpHead from '../../../components/BCorpHead/BCorpHead'

type Props = {
  pageTitle: string,
  form: string
}

export default class HubspotFormsPage extends React.Component<Props> {
  // constructor (props: Props) {
  //   super(props)

  //   // this.state = {}
  // }

  // componentDidMount () {

  // }

  render () {
    console.log(this.props)

    const pageTitle = this.props.pageTitle
    const pageDescription = ''

    return (
      <div className={'hubspot-form'}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <DefaultTemplate
          data={{
            page_title: this.props.pageTitle
          }}
          renderModules={() => {
            return <HubspotForms form={this.props.form} initialHeight={800} />
          }}
        />
      </div>
    )
  }
}
