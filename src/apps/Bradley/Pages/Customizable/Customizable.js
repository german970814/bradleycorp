import React from 'react'
import SinglePostModule from './Modules/SinglePostModule/SinglePostModule'
import MultiPostButtonModule from './Modules/MultiPostButtonModule/MultiPostButtonModule'
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

      <MultiPostButtonModule
        title={'Design Tools'}
        postIDs={[126, 126, 126]}
        accentColor={'#ffffff'}
        background={''}
        skin={'light'} />

      <SinglePostModule
        postID={126}
        accentColor={'#ffffff'}
        background={''}
        skin={'light'} />
    </div>
  )
}

export default Customizable
