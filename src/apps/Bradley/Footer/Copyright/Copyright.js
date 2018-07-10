import React from 'react'
import { Link } from 'react-router-dom'
import style from './Copyright.scss'

const Copyright = props => {
  return (
    <React.Fragment>
      <div className={style.divider} />

      <div className={`row ${style.copyrightWrapper}`}>
        <div className={`col1 col2-tablet ${style.copyrightCol}`}>
          <div className={`legal ${style.menuItem}`}>
            {`${String.fromCharCode(169)} 2018 Bradley Corporation`}
          </div>
          <Link to={'/legal'} className={style.menuItem}>
            <div className={`legal`}>{'Legal Statement'}</div>
          </Link>
          <Link to={'/privacy'} className={style.menuItem}>
            <div className={`legal`}>{'Privacy Policy'}</div>
          </Link>
        </div>

        <div
          className={`col1 col2-tablet ${style.colRight} ${
            style.copyrightCol
          }`}>
          <Link to="/trademarks">
            <div className={`legal ${style.menuItem}`}>
              {`The Bradley Logo and registered trademarks are owned by The Bradley Corporation${String.fromCharCode(
                174
              )}`}
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Copyright
