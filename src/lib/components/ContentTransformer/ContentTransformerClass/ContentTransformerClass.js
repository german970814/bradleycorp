// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import FixedAspectRatioBox from '../../../components/FixedAspectRatioBox/FixedAspectRatioBox'
import FileDownloadLink from '../../../components/FileDownloadLink/FileDownloadLink'
import ArrowButton from '../../ArrowButton/ArrowButton'
import BCorpVideo from '../../../components/BCorpVideo/BCorpVideo'
import BCorpLink from '../../BCorpLink/BCorpLink'
import style from '../ContentTransformer.scss'

type HTMLParser2Node = {
  attribs: {
    href?: string,
    type?: string,
    src?: string
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
}

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
    } else if (this.node.type === 'script') {
      return this.transformScript()
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
    // assuming this is enough to identify shortcode,
    // may need to be more rigorous
    if (this.node.data.indexOf('[embed]') !== -1) {
      return this.transformEmbedShortcode()
    }

    if (this.node.data.indexOf('[cta_button ') !== -1) {
      return this.transformCTAButtonShortcode()
    }

    if (this.node.data.indexOf('[cta_arrow ') !== -1) {
      return this.transformCTAArrowShortcode()
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

  transformCTAButtonShortcode () {
    const link = this.node.data.match(/link="(.*)"]/)
    const text = this.node.data.match(/](.*)\[\/cta_button\]/)

    if (link && link[1] && text && text[1]) {
      return (
        <BCorpLink
          url={link[1]}
          renderInternal={url => {
            return (
              <Link to={url}>
                <button className={style.button}>{text[1]}</button>
              </Link>
            )
          }}
          renderExternal={url => {
            return (
              <a href={url} target="_blank">
                <button className={style.button}>{text[1]}</button>
              </a>
            )
          }}
        />
      )
    }
  }

  transformCTAArrowShortcode () {
    const link = this.node.data.match(/link="(.*)"]/)
    const text = this.node.data.match(/](.*)\[\/cta_arrow\]/)

    if (link && link[1] && text && text[1]) {
      return (
        <div className={style.arrowButton}>
          <ArrowButton text={text[1]} link={link[1]} />
        </div>
      )
    }
  }

  transformScript () {
    // console.log( this.node )
    return (
      <script
        key={this.index}
        type={this.node.attribs.type}
        src={this.node.attribs.src}
        dangerouslySetInnerHTML={{
          __html: this.node.children.length ? this.node.children[0].data : null
        }}
      />
    )
  }
}

export default ContentTransformerClass
