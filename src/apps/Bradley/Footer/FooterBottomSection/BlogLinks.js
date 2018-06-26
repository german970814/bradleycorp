import React from 'react'
import FooterBottomSectionItem from './FooterBottomSectionItem'

const BlogLinks = props => {
  return (
    <React.Fragment>

      <FooterBottomSectionItem
        link={'http://bimrevit.site.bradleydev.twoxfour.com/'}
        title={'BIM REVIT BLOG'} />

      <FooterBottomSectionItem
        link={'http://thewashfountain.site.bradleydev.twoxfour.com/'}
        title={'THE WASHFOUNTAIN BLOG'} />

    </React.Fragment>
  )
}

export default BlogLinks
