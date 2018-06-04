// @flow
import * as React from 'react'
import DefaultTemplate from '../Templates/DefaultTemplate/DefaultTemplate'

export default class HubspotForms extends React.Component {
	constructor( props ) {
		super(props)

		this.state = {}
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
                const iframe = document.getElementById('where-to-buy')
                const _window = iframe.contentWindow

                _window.postMessage({
                  callback: this.setHeight.bind(this)
                }, '*')
              }}
              ></iframe>
            )
          }}
        />
		</div>
	}

  setHeight( h ) {
    console.log( h )
  }
}