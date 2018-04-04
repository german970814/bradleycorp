// @flow
import React, { Fragment } from 'react'
import type { BCorpPost } from '../../../../types/post_types'
import Media from 'react-media'
import { MOBILEMAXWIDTH } from '../../../../../globals'
import Divider from '../../../../components/Divider/Divider'
import PostPrimary from './PostPrimary/PostPrimary'
import PostSecondary from './PostSecondary/PostSecondary'
import PostRemaining from './PostRemaining/PostRemaining'
import style from './Posts.scss'

type Props = {
  data: Array<BCorpPost>
}

const Posts = (props: Props) => {
  const posts = props.data

  return posts.map((post: BCorpPost, index: number) => {
    return getPostElement(post, index)
  })
}

function getPostElement (post: BCorpPost, index: number) {
  if (index === 0) {
    return <PostPrimary key={index} post={post} />
  } else if (index === 1) {
    return (
      <Fragment>
        <Divider className={`col1 ${style.divider}`} fullWidth />
        <PostSecondary key={index} post={post} />
      </Fragment>
    )
  } else if (index === 2) {
    return <PostSecondary key={index} post={post} />
  } else if (index === 3) {
    return (
      <Fragment>
        <Divider className={`col1 ${style.divider}`} fullWidth />
        <PostRemaining key={index} post={post} />
      </Fragment>
    )
  } else {
    return (
      <Media query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            <Fragment>
              <Divider className={`col1 ${style.divider}`} fullWidth />
              <PostRemaining key={index} post={post} />
            </Fragment>
          ) : (
            <PostRemaining key={index} post={post} />
          )
        }
      </Media>
    )
  }
}

export default Posts
