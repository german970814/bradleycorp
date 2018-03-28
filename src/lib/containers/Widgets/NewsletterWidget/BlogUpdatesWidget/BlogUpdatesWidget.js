import PropTypes from 'prop-types'
import NewsletterWidget from '../NewsletterWidget'

/**
 * Class for the Blog Updates Widget
 *
 * This has the same style and layout as the Newsletter Widget,
 * we just need to send the form input to a different place on submit
 * It should instead send the email to the WP RSS
 *
 * @extends NewsletterWidget
 */
class BlogUpdatesWidget extends NewsletterWidget {
  handleSubmit (e) {
    console.log(`submitted blog updates form`)
    e.preventDefault()
  }

  render () {
    return super.render()
  }
}

BlogUpdatesWidget.propTypes = {
  ...NewsletterWidget.propTypes,

  blog: PropTypes.oneOf(['washfountain', 'bim-revit']).isRequired
}

export default BlogUpdatesWidget
