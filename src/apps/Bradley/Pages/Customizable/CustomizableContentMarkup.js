import ReactHtmlParser from 'react-html-parser'

const CustomizableContentMarkup = ({ content }) => {
  return ReactHtmlParser(content)
}

export default CustomizableContentMarkup
