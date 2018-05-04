// @flow
import React from 'react'
import Lightbox from '../../../../lib/containers/Lightbox/Lightbox'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'
import type { ProductPost, LiteraturePost } from '../../../../lib/types/cpt_types'
import style from './ApplicationGalleryDetail.scss'

type Props = {
  products: Array<ProductPost>,
  literatures: Array<LiteraturePost>
}

const ProductList = (props: Props) => (
  <div className={`${style.productListWrapper}`}>
    <ul>
      {props.products.map((product, ind) => {
        return <li key={ind}>
          <a>{product.post.post_title}</a>
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
