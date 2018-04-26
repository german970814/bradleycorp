// @flow
import * as React from 'react'
import style from './LightboxTitleBannerContentBox.scss'

type Props = {
  title: string,
  children: React.Node
}

const LightboxTitleBannerContentBox = (props: Props) => {
  return (
    <div className={style.bannerContentBox}>
      <h5 className={style.title}>{props.title}</h5>
      <div className={style.contentContainer}>{props.children}</div>
    </div>
  )
}

export default LightboxTitleBannerContentBox
