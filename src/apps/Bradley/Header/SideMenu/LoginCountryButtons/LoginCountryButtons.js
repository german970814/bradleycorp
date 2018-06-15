// @flow
import * as React from 'react'
import style from './LoginCountryButtons.scss'

type Props = {
  bottom?: number
}

class LoginCountryButtons extends React.PureComponent<Props> {
  render () {
    return (
      <div
        style={{
          bottom: this.props.bottom ? `${this.props.bottom}px` : undefined
        }}
        className={`row ${style.loginCountryButton}`}>
        {/*
        <div className={`col2 ${style.button} ${style.login}`}>
          <img
            src={require('../../../../../images/avatar/avatar@2x.png')}
            className={style.avatar}
          />
          <h6 className={`${style.userText}`}>{'LOGIN'}</h6>
        </div>
        */}

        <div className={`col1 ${style.button} ${style.country}`}>
          <img
            src={require('../../../../../images/flag/flag@2x.png')}
            className={style.flag}
          />
          <h6 className={`${style.countryText}`}>{'USA'}</h6>
        </div>
      </div>
    )
  }
}

export default LoginCountryButtons
