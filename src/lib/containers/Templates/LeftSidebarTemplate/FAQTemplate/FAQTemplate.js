// @flow
import * as React from 'react'
import type { BCorpPost, WPPost } from '../../../../types/post_types'
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
    page_title: string
  }
};

type State = {
  faqs: Array<WPPost>,
  processing: Boolean
};

class FAQTemplate extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      faqs: [{ ID: 0 }],
      processing: false,
    }
  }

  componentDidMount () {
    this.getFAQs()
  }

  componentDidUpdate(prevtProps) {
    if ( this.props.data.page_id !== prevtProps.data.page_id ) {
      this.getFAQs();
    }
  }

  renderFAQ () {
    if ( 0 === this.state.faqs.length ) {
      return <Loading />;
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
    if ( this.state.processing ) {
      return;
    }

    this.setState({ faqs: [], processing: true })

    try {
      const client = new CPTApiClient('faq')
      const faqResponse = 0 < this.props.data.metaboxes.faq_category.length
        ? await client.getByTax('faq_category', this.props.data.metaboxes.faq_category)
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
