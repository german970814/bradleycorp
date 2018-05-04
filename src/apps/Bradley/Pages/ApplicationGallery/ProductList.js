// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import style from './ApplicationGalleryDetail.scss'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
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
function getProductUrlByProduct(product: ProductPost): string {
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
      renderLightboxContents={() => {
        return <div>
          <div className={`${style.lightBoxListWrapper}`}>
            <LightboxTitleBannerContentBox title={'Confirm Download'}>
              <div className={`${style.lightBoxListWrapper}`}>
                <p className={`${style.lightBoxListWeight}`}>FILE SIZE: 4MB</p>
                <ul>
                  <li>Test Literature</li>
                </ul>
                <p>Do you wish to continue?</p>
                <button className={`${style.productListLightBoxButton}`}>Confirm</button>
                <button className={`${style.productListLightBoxButton} ${style.productListLightBoxButtonRedBorder}`}>Cancel</button>
              </div>
            </LightboxTitleBannerContentBox>
          </div>
        </div>
      }}
      onLightboxClose={() => {
        console.log('closed')
        return undefined
      }}
      fullWidth
      fitLightboxToContent
      maxWidth={'370px'}
    />}
  </div>
)

export default ProductList
