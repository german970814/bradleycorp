// @flow
import * as React from 'react'
import DefaultTemplate from '../../Templates/DefaultTemplate/DefaultTemplate'

export default class WhereToBuyPage extends React.Component {
	constructor( props ) {
		super(props)

		this.state = {}
	}

	componentDidMount() {
		const iframe = document.getElementById('locatorIframe')

		console.log( iframe )
	}

	render () {
		return <div className={'where-to-buy'}>
			<DefaultTemplate
          data={{
            page_title: 'Where To Buy'
          }}
          renderModules={() => {
            return (
              <React.Fragment>
              	<iframe id="locatorIframe" src="http://locator.test/" width="100%" height="800" frameBorder="0"></iframe>
	              {/*<div id="locator-v2"></div>*/}
								{/*<script async src="http://locator.test/locator-v2.js"></script>*/}
							</React.Fragment>
            )
          }}
        />
		</div>
	}
}