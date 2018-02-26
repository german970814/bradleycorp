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
  renderGrid (size) {
    return this.state.posts.map((post, index, posts) => {
      return (
        <div
          key={index}
          className={this.getColumnClass(size, posts.length, index)} >
          <PostGridItem
            post={post}
            size={size} />
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
          {(containerClassName, size) => {
            return (
              <div
                className={`row ${containerClassName}`} >

                {this.renderGrid(size)}

              </div>
            )
          }}
        </ContainerMediaQuery >

      </div>
    )
  }

  getColumnClass (size, total, index) {
    if (size === 'mobile') {
      return 'col1'
    }

    if (total === 1) {
      return 'col1'
    } else if (total === 2) {
      return 'col2'
    } else if (total === 3) {
      return 'col3'
    } else if (total === 4) {
      if (size === 'tablet') {
        return 'col2'
      } else if (size === 'desktop') {
        return 'col4'
      }
    } else if (total === 5) {
      if (index === 0 || index === 1 || index === 2) {
        return 'col3'
      } else if (index === 3 || index === 4) {
        return 'col2'
      }
    } else if (total === 6) {
      return 'col3'
    }
  }
}

MultiPostNoExcerptModule.propTypes = {

  ...PostGettingModule.propTypes

}

export default MultiPostNoExcerptModule
