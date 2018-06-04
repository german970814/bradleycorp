// @flow
import * as React from 'react'
import DefaultTemplate from '../../Templates/DefaultTemplate/DefaultTemplate'

type Props = {
  pageTitle: string,
};

export default class WhereToBuyPage extends React.Component<Props> {
	constructor( props: Props ) {
		super(props)

		// this.state = {}
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
              	<iframe
              		id="locatorIframe"
              		src="http://forms.bradleydev.twoxfour.com/where-to-buy/index.html"
              		width="100%"
              		height="800"
              		frameBorder="0"
              		></iframe>
							</React.Fragment>
            )
          }}
        />
		</div>
	}
}