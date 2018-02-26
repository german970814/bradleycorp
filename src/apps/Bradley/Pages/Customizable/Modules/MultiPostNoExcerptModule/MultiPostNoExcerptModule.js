import React from 'react'
import PostGettingModule from '../PostGettingModule'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import PostGridItem from './PostGridItem/PostGridItem'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './MultiPostNoExcerptModule.scss'

/**
 * Handles the presentational logic for the Multi Post No Excerpt Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostNoExcerptModule extends PostGettingModule {
  renderGrid () {
    return this.state.posts.map((post, index) => {
      return (
        <div
          key={index}
          className={style.col1} >
          <PostGridItem
            post={post} />
        </div>
      )
    })
  }

  render () {
    return (
      <div
        ref={(node) => {
          if (!this.node) {
            this.node = node
          }
        }}
        className={`${moduleStyle.module} ${style.multiPostNoExcerptModule}`} >

        <ContainerMediaQuery
          node={this.node} >
          {(containerClassName) => {
            return (
              <div
                className={`row ${containerClassName}`} >

                {this.renderGrid()}

              </div>
            )
          }}
        </ContainerMediaQuery >

      </div>
    )
  }
}

MultiPostNoExcerptModule.propTypes = {

  ...PostGettingModule.propTypes

}

export default MultiPostNoExcerptModule
