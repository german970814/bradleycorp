import React from 'react'
import FooterBottomSectionItem from './FooterBottomSectionItem'

const LoginItems = props => {
  return (
    <React.Fragment>

      <FooterBottomSectionItem
        link={'#'}
        title={'LOGIN'} />

      <FooterBottomSectionItem
        link={'#'}
        title={'ANSWERNET'}
        padlock />

      <FooterBottomSectionItem
        link={'#'}
        title={'BRADZONE'}
        padlock />

    </React.Fragment>
  )
}

export default LoginItems
