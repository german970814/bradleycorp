// @flow
import * as React from 'react'
import type { WPComment } from '../../../types/comment_types'
import ReactHtmlParser from 'react-html-parser'
import Divider from '../../../components/Divider/Divider'
import style from './Comment.scss'

type Props = {
  comment: WPComment
}

class Comment extends React.Component<Props> {
  renderAvatar () {
    if (
      !this.props.comment.author_avatar_urls ||
      !this.props.comment.author_avatar_urls['96']
    ) {
      return
    }

    return <img src={this.props.comment.author_avatar_urls['96']} />
  }

  renderName () {
    if (!this.props.comment.author_name) {
      return
    }

    return (
      <div className={`small-body ${style.name} ${style.smallBody}`}>
        {this.props.comment.author_name}
      </div>
    )
  }

  renderDate () {
    if (!this.props.comment.date) {
      return
    }

    return (
      <div className={`small-body ${style.date}`}>
        {this.props.comment.date}
      </div>
    )
  }

  render () {
    return (
      <div className={`row ${style.comment}`}>
        <Divider fullWidth className={style.divider} />
        <div className={`col1 col4-tablet ${style.userInfo}`}>
          <div className={'row'}>
            <div className={`col4 col1-tablet ${style.avatar}`}>
              {this.renderAvatar()}
            </div>
            <div className={`col4x3 col1-tablet ${style.details}`}>
              {this.renderName()}
              {this.renderDate()}
              <div className={`small-body ${style.reply} ${style.smallBody}`}>
                {'Reply'}
              </div>
            </div>
          </div>
        </div>
        <div className={`col1 col4x3-tablet ${style.content}`}>
          {ReactHtmlParser(this.props.comment.content.rendered)}
        </div>
      </div>
    )
  }
}

export default Comment
