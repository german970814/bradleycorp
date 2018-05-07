// @flow
import React from 'react'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
import { Link } from 'react-router-dom'
import style from './ApplicationGalleryDetail.scss'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import type { ProductPost, LiteraturePost } from '../../../../lib/types/cpt_types'

type Props = {
  products: Array<ProductPost>,
  literatures: Array<LiteraturePost>
}

/**
 * Get url of product detail for specific ProductPost object
 * if product has not name, '#' is returned
 *
 * @param {Object} product
 */
function getProductUrlByProduct (product: ProductPost): string {
  if (product.post.post_name) {
    return `/product/${product.post.post_name}`
  }
  return '#'
}

const ProductList = (props: Props) => (
  <div className={`${style.productListWrapper}`}>
    <ul>
      {props.products.map((product, ind) => {
        return <li key={ind}>
          <Link to={{ pathname: getProductUrlByProduct(product) }}>{product.post.post_title}</Link>
          <span>{product.meta.product_sku}</span>
        </li>
      })}
    </ul>
    {Boolean(props.literatures.length) && <LightboxV2
      renderChildren={openLightbox => {
        return <button onClick={openLightbox} className={`${style.productListButton}`}>Product Literature</button>
      }}
      renderLightboxContents={(closeLightBox) => {
        return <div>
          <div className={`${style.lightBoxListWrapper}`}>
            <LightboxTitleBannerContentBox title={'Confirm Download'}>
              <div className={`${style.lightBoxListWrapper}`}>
                <p className={`${style.lightBoxListWeight}`}>FILE SIZE: 4MB</p>
                <ul>
                  {props.literatures.map((literature, index) => {
                    return <li key={index}>{literature.post.post_title}</li>
                  })}
                </ul>
                <p>Do you wish to continue?</p>
                <button onClick={() => { window.location.href = props.literatures[0].meta.literature_pdf }} className={`${style.productListLightBoxButton}`}>Confirm</button>
                <button onClick={ closeLightBox } className={`${style.productListLightBoxButton} ${style.productListLightBoxButtonRedBorder}`}>Cancel</button>
              </div>
            </LightboxTitleBannerContentBox>
          </div>
        </div>
      }}
      onLightboxClose={() => {
        return undefined
      }}
      fullWidth
      fitLightboxToContent
      maxWidth={'370px'}
    />}
  </div>
)

export default ProductList
