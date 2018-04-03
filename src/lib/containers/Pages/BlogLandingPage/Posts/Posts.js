// @flow
import React from 'react'
import type { BCorpPost } from '../../../../types/post_types'
import PostPrimary from './PostPrimary/PostPrimary'
import PostSecondary from './PostSecondary/PostSecondary'
import PostRemaining from './PostRemaining/PostRemaining'

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
  } else if (index === 1 || index === 2) {
    return <PostSecondary key={index} post={post} />
  } else {
    return <PostRemaining key={index} post={post} />
  }
}

export default Posts
