import React from 'react'
import FooterBottomSectionItem from './FooterBottomSectionItem'
import style from '../Footer.scss'

const LoginItems = props => {
  return (
    <React.Fragment>

      <div className={'col1'}>
        <div className={`${style.menuItem} ${style.menuItemBottomSection}`}>
          <div className={`small-link-gray ${style.menuItemLinkGray}`}>LOGIN</div>
        </div>
      </div>

      <FooterBottomSectionItem
        link={'https://answernet.bradleycorp.com/'}
        title={'ANSWERNET'}
        padlock />

      <FooterBottomSectionItem
        link={'http://bradzone.bradleycorp.com/'}
        title={'BRADZONE'}
        padlock />

    </React.Fragment>
  )
}

export default LoginItems
