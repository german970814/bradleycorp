// @flow
import * as React from 'react'
import type { BCorpPost, WPPost } from '../../../../types/post_types'
import type { BCorpMetaboxes } from '../../../../types/customPage_types'
import CPTApiClient from '../../../../../api/cpt_client'
import LeftSidebarTemplate from '../LeftSidebarTemplate'
import DropDownTab from '../../../DropDownTab/DropDownTab'
import Loading from '../../../../components/Loading/Loading'

type Props = {
  /**
   * The page template data
   */
  data: {
    page_id: number,
    page_title: string,
    metaboxes: false | BCorpMetaboxes
  }
}

type State = {
  faqs: Array<WPPost>,
  processing: boolean
}

class FAQTemplate extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      faqs: [{ ID: 0 }],
      processing: false
    }
  }

  componentDidMount () {
    this.getFAQs()
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.data.page_id !== prevProps.data.page_id) {
      this.getFAQs()
    }
  }

  renderFAQ () {
    if (this.state.faqs.length === 0) {
      return <Loading />
    }
    return this.state.faqs.map((faq, index) => {
      if (!faq['post_title'] || !faq['post_content']) {
        return null
      } else {
        return (
          <DropDownTab
            key={index}
            title={faq['post_title']}
            content={faq['post_content']}
          />
        )
      }
    })
  }

  render () {
    return (
      <LeftSidebarTemplate
        data={this.props.data}
        renderModules={this.renderFAQ.bind(this)}
      />
    )
  }

  async getFAQs () {
    if (this.state.processing || !this.props.data.metaboxes) {
      return
    }
    const { metaboxes } = this.props.data

    this.setState({ faqs: [], processing: true })

    try {
      const client = new CPTApiClient('faq')
      const faqResponse =
        metaboxes.faq_category && metaboxes.faq_category.length > 0
          ? await client.getByTax('faq_category', metaboxes.faq_category)
          : await client.getLatest(-1)
      const faqData: Array<BCorpPost> = faqResponse.data

      const faqs = faqData.map(faq => {
        return faq.post
      })

      this.setState({ faqs, processing: false })
    } catch (err) {
      console.log(err)
    }
  }
}

export default FAQTemplate
