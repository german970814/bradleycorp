// @flow
import * as React from 'react'
import DefaultTemplate from '../Templates/DefaultTemplate/DefaultTemplate'

type Props = {
  pageTitle: string,
  form: string,
};

export default class HubspotForms extends React.Component<Props> {
	constructor( props: Props ) {
		super(props)

		// this.state = {}
	}

  componentDidMount() {

  }

	render () {
    console.log( this.props )
		return <div className={'hubspot-form'}>
			<DefaultTemplate
          data={{
            page_title: this.props.pageTitle
          }}
          renderModules={() => {
            return (
              <iframe
              id="where-to-buy"
              src={`http://forms.bradleydev.twoxfour.com/${this.props.form}.html`}
              width="100%"
              height="800"
              frameBorder="0"
              onLoad={() => {
                const iframe = ((document.getElementById('where-to-buy') :any) :HTMLIFrameElement)
                const _window = iframe && iframe.contentWindow ? iframe.contentWindow : null

                if ( ! _window )
                  return

                _window.postMessage({

                }, '*')
              }}
              ></iframe>
            )
          }}
        />
		</div>
	}
}