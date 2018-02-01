import React from 'react'
import { Link } from 'react-router-dom'
import style from './Copyright.scss'

const Copyright = props => {
  return (
    <React.Fragment>

      <div className={style.divider}></div>

      <div className={`row ${style.copyrightWrapper}`} >

        <div className={`col1 col2-tablet ${style.copyrightCol}`} >
          <div className={`legal ${style.menuItem}`} >
            {`${String.fromCharCode(169)} 2018 Bradley Corporation`}
          </div>
          <div className={`legal ${style.menuItem}`} >
            <Link
              to={'#'} >
              {'Legal Statement'}
            </Link>
          </div>
          <div className={`legal ${style.menuItem}`} >
            <Link
              to={'#'} >
              {'Privacy Policy'}
            </Link>
          </div>
        </div>

        <div className={`col1 col2-tablet ${style.colRight} ${style.copyrightCol}`} >
          <div className={`legal ${style.menuItem}`} >
            {`The Bradley Logo and registered trademarks are owned by TheBradley Corporation${String.fromCharCode(174)}`}
          </div>
        </div>

      </div>

    </React.Fragment>
  )
}

export default Copyright
