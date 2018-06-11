// @flow
import * as React from 'react'
import DefaultTemplate from '../Templates/DefaultTemplate/DefaultTemplate'

type Props = {
  // pageTitle: string,
  form: string,
};

export default class HubspotForms extends React.Component<Props> {
  constructor (props: Props) {
    super(props)

    this.formID = this.props.form.replace(/[^\w]/g, '_')
    this.formUrl = `http://forms.bradley.test`

    this.state = {
      iframeWidth: '100%',
      iframeHeight: this.props.initialHeight || 100,
    }
  }

  updateIframeDimensions(event){
    console.log( event.data )
    if ( this.formID !== event.data.iframeID ) {
      return;
    }
    const {height, witdth} = event.data

    if ( height && 0 < height ) {
      this.setState({
        iframeHeight: height,
      })
    }
  }

  render () {

    return <div className={'hubspot-form'}>
      <iframe
        id={this.formID}
        src={this.formUrl+`/${this.props.form}.html`}
        width={this.state.iframeWidth}
        height={this.state.iframeHeight}
        frameBorder="0"
        style={{
          ...this.props.style,
          height: `${this.state.iframeHeight}px`,
          width: this.state.iframeWidth,
        }}
        onLoad={this.setTheIframeHeight.bind(this)}
      ></iframe>
    </div>
  }

  setTheIframeHeight() {
    const iframe = ((document.getElementById(this.formID)
      :any)
      :HTMLIFrameElement)
    const _window = iframe && iframe.contentWindow
      ? iframe.contentWindow
      : iframe.contentDocument

    if (!_window) {
      console.warn('Could not get iframe window.')
      return;
    }

    // when we post a message to the iframe window
    // we will need to hear back from it. This adds
    // the event listener to do so
    window.addEventListener(
      "message",
      this.updateIframeDimensions.bind(this),
      false
    );

    // console.log( _window )
    // lets post a message to the iframe window
    _window.postMessage({
      action: 'getDimensions',
      iframeID: this.formID,
    }, this.formUrl)

    console.log( 'setTheIframeHeight ran' )
  }
}
