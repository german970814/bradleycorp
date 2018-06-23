import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Divider from '../../../../lib/components/Divider/Divider'
import ProductApiClient from '../../../../api/product_client'
import Error404 from '../../../../lib/components/Error/Error404/Error404'
import Loading from '../../../../lib/components/Loading/Loading'
import productObjectShape from './productObjectShape'
import ProductDetailException from '../../../../exceptions/ProductDetailException'
import ProductContent from './ProductContent/ProductContent'
import ProductTabs from './ProductTabs/ProductTabs'
import ProductScroller from '../../../../lib/containers/ProductScroller/ProductScroller'
import BCorpHead from '../../../../lib/components/BCorpHead/BCorpHead'
import style from './ProductDetail.scss'

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      productDetail: productObjectShape
    }

    this.getProductInfo = this.getProductInfo.bind(this)
  }

  componentDidMount () {
    this.getProductInfo(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.slug !== this.props.match.params.slug) {
      this.getProductInfo(nextProps)
    }
  }

  renderPurchasedWith () {
    if (this.state.productDetail['purchased_with'].length !== 0) {
      return (
        <section>
          <ProductScroller
            title={'Frequently Purchased With'}
            productsArray={this.state.productDetail['purchased_with']}
            numberMobile={2}
            numberTablet={3}
            numberDesktop={5}
          />
        </section>
      )
    }
  }

  renderDivider () {
    if (
      this.state.productDetail['purchased_with'].length !== 0 &&
      this.state.productDetail['similar'].length !== 0
    ) {
      return <Divider className={style.divider} />
    }
  }

  renderSimilarProducts () {
    if (this.state.productDetail['similar'].length !== 0) {
      return (
        <section>
          <ProductScroller
            title={'Similar Products'}
            productsArray={this.state.productDetail['similar']}
            numberMobile={2}
            numberTablet={3}
            numberDesktop={5}
          />
        </section>
      )
    }
  }

  render () {
    console.log(this.state.productDetail)

    if (this.state.loading) {
      return <Loading />
    }

    if (this.state.productDetail.product.post.ID === 0) {
      return <Error404 />
    }

    // defaults to post title
    const pageTitle =
      this.state.productDetail.product.post.meta_title ||
      this.state.productDetail.product.post.post_title
    const pageDescription =
      this.state.productDetail.product.post.meta_description || ''

    return (
      <div className={style.productDetailPage}>
        <BCorpHead title={pageTitle} description={pageDescription} />

        <section className={style.content}>
          <ProductContent
            title={this.state.productDetail.product.post['post_title']}
            content={this.state.productDetail.product.post['post_content']}
            featuredImageSrc={
              this.state.productDetail.product.media['featured_image'][0]
            }
            images={
              this.state.productDetail.product.meta['product_media']
                ? this.state.productDetail.product.meta['product_media']
                  .images[0]
                : ''
            }
            videos={
              this.state.productDetail.product.meta['product_media']
                ? this.state.productDetail.product.meta['product_media'].videos
                : ''
            }
            newUntil={
              this.state.productDetail.product.meta['product_new_until']
            }
            sku={this.state.productDetail.product.meta['product_sku']}
            awards={
              this.state.productDetail.product.meta['product_awards']
                ? this.state.productDetail.product.meta['product_awards']
                : []
            }
            cta={this.state.productDetail.product.meta['product_cta']}
          />
        </section>

        <section className={style.tabs}>
          <ProductTabs
            productID={this.state.productDetail.product.post.ID}
            tabsData={this.state.productDetail.tabs}
          />
        </section>

        {this.renderPurchasedWith()}
        {this.renderDivider()}
        {this.renderSimilarProducts()}
      </div>
    )
  }

  async getProductInfo (props) {
    this.setState({ loading: true })
    try {
      const productSlug = props.match.params.slug
      const productDetail = await this.getProductDetailPage(productSlug)
      const productDetailData = productDetail.data

      // set state leaving defaults where there exists no data in the request
      return this.setState({
        loading: false,
        productDetail: Object.assign({}, productObjectShape, productDetailData)
      })
    } catch (err) {
      console.log(new ProductDetailException(err))
      this.setState({ loading: false })
    }
  }

  getProductDetailPage (slug) {
    const productApiClient = new ProductApiClient()
    return productApiClient.getProductDetailPage(slug)
  }
}

ProductDetail.propTypes = {
  match: PropTypes.object.isRequired
}

export default ProductDetail
