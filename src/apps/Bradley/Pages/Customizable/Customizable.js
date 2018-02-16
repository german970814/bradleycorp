import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPageApiClient from '../../../../api/customPage_client'
import { validChain } from '../../../../lib/bcorpObject'
// import SinglePostModule from './Modules/SinglePostModule/SinglePostModule'
// import MultiPostButtonModule from './Modules/MultiPostButtonModule/MultiPostButtonModule'
// import CTAModule from '../../../../lib/components/Modules/CTAModule/CTAModule'
import style from './Customizable.scss'

class Customizable extends Component {
  constructor (props) {
    super(props)

    this.defaultState = {
      content: '',
      rows: []
    }

    this.state = this.defaultState
  }

  componentDidMount () {
    if (!validChain(this.props, 'match', 'params', 'slug')) {
      return
    }

    const { slug } = this.props.match.params
    this.getPage(slug)
  }

  componentWillReceiveProps (nextProps) {
    if (!validChain(this.props, 'match', 'params', 'slug') ||
      !validChain(nextProps, 'match', 'params', 'slug')) {
      return
    }

    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getPage(nextProps.match.params.slug)
    }
  }

  render () {
    return (
      <div
        className={style.customizable}
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }

  componentDidUpdate () {
    // put modules in here
  }

  async getPage (slug) {
    try {
      const customPageAPIClient = new CustomPageApiClient()
      const page = await customPageAPIClient.getBySlug(slug)
      const pageData = page.data

      // set state leaving defaults where there exists no data in the request
      return this.setState(Object.assign({}, this.defaultState, pageData))
    } catch (err) {
      console.log(err)
    }
  }
  /**
   *
   * This will eventually do the following:
   *
   * 1. request custom page data, receiving the page content as a string of shortcodes
   *
   * 2. map each shortcode into the correct module passing shortcode atts as props
   *
   * 3. each module component will be rendered inside a layout (row/col) component
   *
   */

  /* const CTAText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

  return (
    <div className={style.customizable} >

      <CTAModule
        title={'Careers'}
        text={CTAText}
        link={'/'}
        linkText={'Current Openings'} />

      <MultiPostButtonModule
        title={'Design Tools'}
        postIDs={[126, 126, 126]}
        accentColor={'#ffffff'}
        background={''}
        skin={'light'} />

      <SinglePostModule
        postID={126}
        accentColor={'#ffffff'}
        background={''}
        skin={'light'} />

    </div>
  ) */
}

Customizable.propTypes = {
  match: PropTypes.object.isRequired
}

export default Customizable
