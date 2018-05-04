// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import style from './ApplicationGalleryDetail.scss'
import Lightbox from '../../../../lib/containers/Lightbox/Lightbox'
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
    {Boolean(props.literatures.length) && <Lightbox>
      <button href={props.literatures[0].meta.literature_pdf}>Product Literature</button>
      <LightboxTitleBannerContentBox title={'Test Title'}>
        <button>Confirm</button>
        <button>Cancel</button>
      </LightboxTitleBannerContentBox>
    </Lightbox>}
  </div>
)

export default ProductList
