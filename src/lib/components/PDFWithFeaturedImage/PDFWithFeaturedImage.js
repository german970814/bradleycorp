// @flow
import React from 'react'
import ImageFrame from '../FixedAspectRatioBox/ImageFrame/ImageFrame'
import style from './PDFWithFeaturedImage.scss'

type Props = {
  /**
   * Title of the PDF
   */
  title: string,
  /**
   * Link to the PDF
   */
  url: string,
  /**
   * A preview image for the PDF
   */
  imageSrc: string,
  titleClassName?: string
}

/**
 * For displaying links to PDFs with a preview image
 */
const PDFWithFeaturedImage = (props: Props) => {
  return (
    <div className={style.pdfWithFeaturedImage}>
      {props.imageSrc && (
        <div className={style.imageContainer}>
          <a href={props.url} target="_blank">
            <ImageFrame
              src={props.imageSrc}
              aspectRatio={116 / 93 * 100}
              sizing={'contain'}
            />
          </a>
        </div>
      )}

      <a href={props.url} target="_blank">
        <div className={`${style.title} ${props.titleClassName || ''}`}>
          {props.title}
        </div>
      </a>
    </div>
  )
}

export default PDFWithFeaturedImage
