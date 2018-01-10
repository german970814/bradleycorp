import React from 'react'
import PropTypes from 'prop-types'
import style from './PDFWithFeaturedImage.scss'

const PDFWithFeaturedImage = props => {

  return (
    <div
      className={style.pdfWithFeaturedImage}>

      <div
        className={style.imageContainer} >
        <img src={props.imageSrc} />
      </div>

      <div
        className={`${style.title} ${props.titleClassName}`} >
        {props.title}
      </div>

    </div>
  )
}

PDFWithFeaturedImage.propTypes = {
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  titleClassName: PropTypes.string,
}

export default PDFWithFeaturedImage
