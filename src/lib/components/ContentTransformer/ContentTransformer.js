// @flow
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import ContentTransformerClass from './ContentTransformerClass/ContentTransformerClass'
import style from './ContentTransformer.scss'

type Props = {
  content: string
}

const ContentTransformer = (props: Props) => {
  return (
    <div className={style.contentTransformer}>
      {ReactHtmlParser(props.content, {
        transform: (node, index) => {
          const contentTransformer = new ContentTransformerClass(node, index)
          return contentTransformer.transform()
        }
      })}
    </div>
  )
}

export default ContentTransformer
