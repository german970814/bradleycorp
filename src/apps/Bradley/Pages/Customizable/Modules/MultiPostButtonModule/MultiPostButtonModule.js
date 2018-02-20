import React from 'react'
import PropTypes from 'prop-types'
import PostGettingModule from '../PostGettingModule'
import ContainerMediaQuery from '../../../../../../lib/containers/ContainerMediaQuery/ContainerMediaQuery'
import PostColumn from './PostColumn/PostColumn'
import moduleStyle from '../../../../../../lib/components/Modules/Modules.scss'
import style from './MultiPostButtonModule.scss'

/**
 * Handles the presentational logic for the Multi Post Button Module
 * Post data is handled by the PostGettingModule class that we extend
 *
 * @extends PostGettingModule
 */
class MultiPostButtonModule extends PostGettingModule {
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
          numColumns={posts.length} />
      )
    })
  }

  getBackgroundImage () {
    return this.props.background
      ? `url(${this.props.background})`
      : `url(${require('../../../../../../images/marble-background-2/shutterstock-522883816.png')})`
  }

  render () {
    return (
      <ContainerMediaQuery
        node={this.state.node} >
        {(containerClassName) => {
          return (
            <div
              ref={(node) => {
                if (!this.state.node) {
                  this.setState({ node })
                }
              }}
              style={{
                backgroundImage: this.getBackgroundImage()
              }}
              className={`row ${containerClassName} ${moduleStyle.module} ${style.multiPostButtonModule}`} >

              {this.renderTitle()}

              <div className={`row ${style.columnsRow}`} >
                {this.renderCols()}
              </div>

            </div>
          )
        }}
      </ContainerMediaQuery >
    )
  }
}

MultiPostButtonModule.propTypes = {

  ...PostGettingModule.propTypes,

  /*
   * Title to display above the posts
   */
  title: PropTypes.string,
  accentColor: PropTypes.string,
  /**
   * The image src as a sting
   */
  background: PropTypes.string,
  skin: PropTypes.string
}

export default MultiPostButtonModule
