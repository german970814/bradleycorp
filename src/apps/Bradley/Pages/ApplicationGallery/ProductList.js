// @flow
import React from 'react'
import LightboxV2 from '../../../../lib/containers/Lightbox/LightboxV2/LightboxV2'
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
