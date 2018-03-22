import React from 'react'
import PostGettingModule from '../PostGettingModule'
import PostGridItem from './PostGridItem/PostGridItem'
import style from './MultiPostNoExcerptModule.scss'

/**
 * Handles the presentational logic for the Multi Post No Excerpt Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostNoExcerptModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'multiPostNoExcerptModule', 6)
  }

  renderGrid () {
    return this.state.posts.map((post, index, posts) => {
      return (
        <div
          key={index}
          className={this.getColumnClass(posts.length, index)} >
          <PostGridItem
            post={post}
            containerClassName={this.containerClassName} />
        </div>
      )
    })
  }

  renderModule () {
    return (
      <div className={`row ${this.containerClassName}`} >

        {this.renderGrid()}

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    if (!this.state.posts || this.state.posts.length < 1 || this.state.posts.length > this.maxPosts) {
      return false
    }

    return true
  }

  getColumnClass (total, index) {
    if (this.size === 'mobile') {
      return 'col1'
    }

    if (total === 1) {
      return 'col1'
    } else if (total === 2) {
      return 'col2'
    } else if (total === 3) {
      return 'col3'
    } else if (total === 4) {
      if (this.size === 'tablet') {
        return 'col2'
      } else if (this.size === 'desktop') {
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
