import React from 'react'
import Lightbox from '../../../../lib/containers/Lightbox/Lightbox'
import LightboxTitleBannerContentBox from '../../../../lib/containers/Lightbox/LightboxTitleBannerContentBox/LightboxTitleBannerContentBox'

const ProductList = (props) => (
  <div>
    <ul>
      {props.products && props.products.map((product, ind) => {
        return <li key={ind}>
          <a><h6>{product.post.post_title} </h6></a>
          <span>{product.meta.product_sku}</span>
        </li>
      })}
    </ul>
    {props.literatures && <Lightbox>
      <button href={props.literatures[0].meta.literature_pdf}>Product Literature</button>
      <LightboxTitleBannerContentBox title={'Test Title'}>
        <button>Confirm</button>
        <button>Cancel</button>
      </LightboxTitleBannerContentBox>
    </Lightbox>}
  </div>
)

export default ProductList
