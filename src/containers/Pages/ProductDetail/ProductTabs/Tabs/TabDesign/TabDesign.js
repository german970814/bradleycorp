import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabDesignDesktop from './TabDesignDesktop'
import LiteratureApiClient from '../../../../../../api/literature_client'
import LiteratureException from '../../../../../../exceptions/LiteratureException'

class TabDesign extends Component {
  constructor(props) {
    super(props)

    this.state = {
      literature: []
    }
  }

  componentDidMount () {
    this.setInitState(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.literature !== this.props.literature) {
      this.setInitState(nextProps)
    }
  }

  render () {
    return (
      <TabDesignDesktop
        videos={this.props.videos.split(",")}
        links={this.props.links}
        literature={this.state.literature} />
    )
  }

  async setInitState( props ) {
    const literature = await this.getLiterature(props)
    this.setState({ ...this.state, literature })
  }

  async getLiterature (props) {
    try {
      const literature = await this.requestLiterature(props.literature)
      return literature.data
    } catch (err) {
      console.log(new LiteratureException(err))
      return []
    }
  }

  requestLiterature (literatureTerms) {
    const literatureApiClient = new LiteratureApiClient()

    const slugs = literatureTerms.map( literatureTerm => {
      return literatureTerm.slug
    })

    return literatureApiClient.getByTaxAndTermArray('product_line', slugs)
  }
}

TabDesign.propTypes = {
  videos: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  literature: PropTypes.array.isRequired
}

export default TabDesign
