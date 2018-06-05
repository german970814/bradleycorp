// @flow
import React from 'react'
import FixedAspectRatioBox from '../../../components/FixedAspectRatioBox/FixedAspectRatioBox'
import FileDownloadLink from '../../../components/FileDownloadLink/FileDownloadLink'
import BCorpVideo from '../../../components/BCorpVideo/BCorpVideo'
import style from './ContentTransformerClass.scss'

type HTMLParser2Node = {
  attribs: {
    href?: string
  },
  /**
   * The type of node (tag, text, style etc)
   */
  type: string,
  /**
   * The name of the node
   */
  name: string,
  /**
   * Array of children nodes  [description]
   */
  children: Array<HTMLParser2Node>,
  /**
   * The node's next sibling
   */
  next: HTMLParser2Node,
  /**
   * The node's previous sibling
   */
  prev: HTMLParser2Node,
  /**
   * The node's parent
   */
  parent: HTMLParser2Node,
  /**
   * The text content, if the type is text
   */
  data: string
};

class ContentTransformerClass {
  node: HTMLParser2Node
  index: number

  constructor (node: HTMLParser2Node, index: number) {
    this.node = node
    this.index = index
  }

  transform () {
    if (this.node.type === 'tag') {
      return this.transformTag()
    } else if (this.node.type === 'text') {
      return this.transformText()
    } else {
      // return the node if it is a valid react element
      return React.isValidElement(this.node) ? this.node : null
    }
  }

  transformTag () {
    if (this.node.name === 'a') {
      // transform <a> tag
      if (this.node.attribs && this.node.attribs.href) {
        if (
          this.node.attribs.href.match(/\.(pdf|doc|docx|docm|docb)$/) !== null
        ) {
          return this.transformFileDownloadLink()
        }
      }
    }
  }

  transformText () {
    if (this.node.data.indexOf('[embed]') !== -1) {
      // assuming this is enough to identify shortcode,
      // may need to be more rigorous
      return this.transformEmbedShortcode()
    }
  }

  transformFileDownloadLink () {
    return (
      <FileDownloadLink
        key={this.index}
        title={this.node.children[0].data}
        titleClass={`link-orange`}
        link={this.node.attribs.href}
      />
    )
  }

  transformEmbedShortcode () {
    let url = this.node.data.substring(7, this.node.data.length)
    url = url.substring(0, url.length - 8)
    return (
      <FixedAspectRatioBox>
        <BCorpVideo className={style.embed} url={url} />
      </FixedAspectRatioBox>
    )
  }
}

export default ContentTransformerClass
