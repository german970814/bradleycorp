// @flow
import ReactHtmlParser from 'react-html-parser'
import ContentTransformerClass from './ContentTransformerClass/ContentTransformerClass'

type Props = {
  content: string
};

const ContentTransformer = (props: Props) => {
  return ReactHtmlParser(props.content, {
    transform: (node, index) => {
      const contentTransformer = new ContentTransformerClass(node, index)
      return contentTransformer.transform()
    }
  })
}

export default ContentTransformer
