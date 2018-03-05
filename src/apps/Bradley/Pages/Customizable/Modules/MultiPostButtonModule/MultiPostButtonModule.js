import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import PostColumn from './PostColumn/PostColumn'
import style from './MultiPostButtonModule.scss'

/**
 * Handles the presentational logic for the Multi Post Button Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostButtonModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'multiPostButtonModule')
  }

  renderTitle () {
    if (!this.props.title) {
      return
    }

    return (
      <h5 className={`${style.title}`} >
        {this.props.title}
      </h5>
    )
  }

  renderCols () {
    const { posts } = this.state

    if (!posts) {
      return
    }

    return posts.map((post, index) => {
      return (
        <PostColumn
          key={index}
          post={post}
          containerNode={this.state.node}
          numColumns={posts.length}
          containerClassName={this.containerClassName} />
      )
    })
  }

  getBackgroundImage () {
    return this.props.background
      ? `url(${this.props.background})`
      : undefined
  }

  renderModule () {
    return (
      <div
        style={{
          backgroundImage: this.getBackgroundImage()
        }}
        className={`row ${this.containerClassName}`} >

        {this.renderTitle()}

        <div className={`row ${style.columnsRow}`} >
          {this.renderCols()}
        </div>

      </div>
    )
  }

  render () {
    return super.render()
  }

  passesValidation () {
    if (!this.state.posts || this.state.posts.length < 2 || this.state.posts.length > 4) {
      return false
    }

    return true
  }
}

MultiPostButtonModule.propTypes = {

  ...PostGettingModule.propTypes,

  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string
}

export default MultiPostButtonModule
