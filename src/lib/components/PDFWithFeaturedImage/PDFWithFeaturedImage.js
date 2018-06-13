import React from 'react'
import PropTypes from 'prop-types'
import style from './PDFWithFeaturedImage.scss'

/**
 * For displaying links to PDFs with a preview image
 */
const PDFWithFeaturedImage = props => {
  return (
    <div className={style.pdfWithFeaturedImage}>
      {props.imageSrc && (
        <div className={style.imageContainer}>
          <a href={props.url} target="_blank">
            <img className={style.image} src={props.imageSrc} />
          </a>
        </div>
      )}

      <a href={props.url} target="_blank">
        <div className={`${style.title} ${props.titleClassName}`}>
          {props.title}
        </div>
      </a>
    </div>
  )
}

PDFWithFeaturedImage.propTypes = {
  /**
   * Title of the PDF
   */
  title: PropTypes.string.isRequired,
  /**
   * Link to the PDF
   */
  url: PropTypes.string.isRequired,
  /**
   * A preview image for the PDF
   */
  imageSrc: PropTypes.string.isRequired,
  titleClassName: PropTypes.string
}

export default PDFWithFeaturedImage
