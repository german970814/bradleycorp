import React from 'react'
import PropTypes from 'prop-types'
import style from './PDFWithFeaturedImage.scss'

const PDFWithFeaturedImage = props => {
  const imageContainer = props.imageSrc
    ? (
      <div
        className={style.imageContainer} >

        <img
          className={style.image}
          src={props.imageSrc} />
      </div>
    )
    : null

  return (
    <div
      className={style.pdfWithFeaturedImage}>

      {imageContainer}

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
  titleClassName: PropTypes.string
}

export default PDFWithFeaturedImage
