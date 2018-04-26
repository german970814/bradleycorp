// @flow
import React, { Component } from 'react'
import DefaultTemplate from '../../../../lib/containers/Templates/DefaultTemplate/DefaultTemplate'
import CPTApiClient from '../../../../api/cpt_client'
import FillColumns from '../../../../lib/components/FillColumns/FillColumns'
import { filterPostsByTerm } from '../../../../lib/bcorpPost'

const PostType = 'application-gallery'

type Props = {}

type State = {
  gallery: Array,
  filters: Object,
  activeFilters: Array<string>
}

export default class ApplicationGallery extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      gallery: [],
      filters: {},
      activeFilters: []
    }

    this.renderContent = this.renderContent.bind(this)
  }

  renderContent () {
    return (
      <div>
        <section id="sidebar">
          <ul>
            {'tax_names' in this.state.filters &&
              this.state.filters.tax_names.map((el, idx) => {
                return (
                  <ul key={idx}>
                    {this.state.filters[el].map((ele, ind) => {
                      return (
                        <li key={ind}>
                          <a onClick={() => this.toggleFilter(ele.slug)}>
                            {ele.name}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )
              })}
          </ul>
        </section>
        <FillColumns colClasses={['col4', 'col4', 'col4']}>
          {this.state.gallery.length &&
            this.state.gallery.map((el, idx) => {
              return (
                <img
                  src={el.meta.app_gallery_img}
                  key={idx}
                  width="400"
                  height="300"
                />
              )
            })}
        </FillColumns>
      </div>
    )
  }

  get filteredGallery () {
    // this.state.activeFilters.forEach(el => {
    // })
    // return filterPostsByTerm(this.state.gallery, )
  }

  toggleFilter (filter: string) {
    const indexOf = this.state.activeFilters.indexOf(filter)
    if (indexOf + 1) {
      const activeFilters = this.state.activeFilters
      activeFilters.splice(indexOf, 1)
      this.setState({ activeFilters })
    } else {
      this.setState({ activeFilters: [filter, ...this.state.activeFilters] })
    }
  }

  componentDidMount () {
    this.getApplicationGallery()
    this.getApplicationGalleryFilters()
  }

  async getApplicationGallery () {
    const client = new CPTApiClient(PostType)
    const response = await client.getLatest(20)
    console.log(response.data)
    this.setState({
      gallery: response.data.map(post => {
        return post
      })
    })
  }

  async getApplicationGalleryFilters () {
    const client = new CPTApiClient(PostType)
    const response = await client.getTerms()
    console.log(response.data)
    this.setState({
      filters: response.data
    })
  }

  render () {
    return (
      <DefaultTemplate
        data={{ page_title: 'Application Gallery' }}
        renderModules={() => this.renderContent()}
        widgetsMoveWithScroll
      />
    )
  }
}
