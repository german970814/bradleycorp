// @flow
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import ContentTransformerClass from './ContentTransformerClass/ContentTransformerClass'
import style from './ContentTransformer.scss'

/**
 * Any content at all from the back end
 * that could have any kind of custom markup
 * should be rendered via this component.
 *
 * Using the ReactHTMLParser,
 * we take the content and unwrap it into the React tree.
 * This is much more powerful than __dangerouslySetInnerHtml,
 * which only renders into the DOM.
 *
 * As part of the parsing and unwrapping process,
 * we get information about the node we are creating,
 * and we can choose to jump in and return anything we like into the tree
 * in place of, or in addition to, that node.
 * We can therefore actually transform certain nodes (eg WP shortcodes)
 * into React elements.
 */

type Props = {
  content: string
}

const ContentTransformer = (props: Props) => {
  return (
    <div className={style.contentTransformer}>
      {ReactHtmlParser(props.content, {
        /**
         * This transform function is run as a callback
         * each time ReactHTMLParser finishes parsing a node,
         * and is passed that new node.
         *
         * This is where we can choose to hook in and return something different
         * in place of that node into the React tree.
         */
        transform: (node, index) => {
          const contentTransformer = new ContentTransformerClass(node, index)
          return contentTransformer.transform()
        }
      })}
    </div>
  )
}

export default ContentTransformer
