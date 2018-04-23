// @flow
import * as React from 'react'
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

const Posts: React.StatelessFunctionalComponent<Props> = (props: Props) => {
  const posts = props.data

  return posts.map((post: BCorpPost, index: number) => {
    return getPostElement(post, index)
  })
}

function getPostElement (post: BCorpPost, index: number): React.Node {
  if (index === 0) {
    return <PostPrimary key={index} post={post} />
  } else if (index === 1) {
    return (
      <React.Fragment key={index}>
        <Divider className={`col1 ${style.divider}`} fullWidth />
        <PostSecondary post={post} />
      </React.Fragment>
    )
  } else if (index === 2) {
    return <PostSecondary key={index} post={post} />
  } else if (index === 3) {
    return (
      <React.Fragment key={index}>
        <Divider className={`col1 ${style.divider}`} fullWidth />
        <PostRemaining post={post} />
      </React.Fragment>
    )
  } else {
    return (
      <Media key={index} query={{ maxWidth: MOBILEMAXWIDTH }}>
        {match =>
          match ? (
            <React.Fragment>
              <Divider className={`col1 ${style.divider}`} fullWidth />
              <PostRemaining post={post} />
            </React.Fragment>
          ) : (
            <PostRemaining post={post} />
          )
        }
      </Media>
    )
  }
}

export default Posts
