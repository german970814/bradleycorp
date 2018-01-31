import React from 'react'
import SinglePostModule from './Modules/SinglePostModule/SinglePostModule'
import style from './Customizable.scss'

const Customizable = props => {
  /**
   *
   * This will eventually do the following:
   *
   * 1. request custom page data, receiving the page content as a string of shortcodes
   *
   * 2. map each shortcode into the correct module passing shortcode atts as props
   *
   * 3. each module component will be rendered inside a layout (row/col) component
   *
   */

  return (
    <div className={style.customizable} >
      <SinglePostModule
        postID={126}
        accentColor={'#ffffff'}
        background={''}
        skin={''} />
    </div>
  )
}

export default Customizable
