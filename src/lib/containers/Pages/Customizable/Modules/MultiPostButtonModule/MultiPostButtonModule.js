import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import PostColumn from './PostColumn/PostColumn'
import BCorpBackground from '../../../../../components/BCorpBackground/BCorpBackground'
import style from './MultiPostButtonModule.scss'

/**
 * Handles the presentational logic for the Multi Post Button Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostButtonModule extends PostGettingModule {
  constructor (props) {
    super(props, style, 'multiPostButtonModule', 3)
  }

  renderTitle () {
    if (!this.props.title) {
      return
    }

    return (
      <h3 className={`${style.title} ${this.skinClass}`} >
        {this.props.title}
      </h3>
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
          containerClassName={this.containerClassName}
          accentColorClass={this.accentColorClass}
          skinClass={this.skinClass}
          skin={this.props.skin} />
      )
    })
  }

  renderModule () {
    return (
      <div className={`row ${this.containerClassName} ${this.skinClass}`} >

        <BCorpBackground
          imageSrc={this.props.background}
          overlay={this.props.backgroundOverlay}
          skin={this.props.skin} />

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
    if (!this.state.posts || this.state.posts.length < 2 || this.state.posts.length > this.maxPosts) {
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
  background: PropTypes.string,
  backgroundOverlay: PropTypes.string
}

export default MultiPostButtonModule
