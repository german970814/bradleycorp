import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'
import Home from '../Pages/Home/Home'

const CustomizableLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/Customizable/Customizable'),
  loading: Loading
})

const BlogSinglePostPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/BlogSinglePostPage/BlogSinglePostPage'),
  loading: Loading
})

const ProductDetailLoadable = Loadable({
  loader: () => import('../Pages/ProductDetail/ProductDetail'),
  loading: Loading
})

const LiteratureAndChipSamplesLoadable = Loadable({
  loader: () =>
    import('../Pages/LiteratureAndChipSamples/LiteratureAndChipSamples'),
  loading: Loading
})

const VideoGalleryLoadable = Loadable({
  loader: () => import('../Pages/VideoGallery/VideoGallery'),
  loading: Loading
})

const ApplicationGalleryLoadable = Loadable({
  loader: () => import('../Pages/ApplicationGallery/ApplicationGallery'),
  loading: Loading
})

const ApplicationGalleryDetailLoadable = Loadable({
  loader: () => import('../Pages/ApplicationGallery/ApplicationGalleryDetail'),
  loading: Loading
})

// Note: <Route exact path="/post/:slug" component={...} /> ie Blog post route
// will use right sidebar template and get blog_sidebar

const Main = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/post/:slug" component={BlogSinglePostPageLoadable} />
      <Route exact path="/product/:slug" component={ProductDetailLoadable} />
      <Route
        exact
        path="/literature-and-chip-samples"
        component={LiteratureAndChipSamplesLoadable}
      />
      <Route exact path="/video-gallery" component={VideoGalleryLoadable} />
      <Route
        exact
        path="/application-gallery"
        component={ApplicationGalleryLoadable}
      />
      <Route
        exact
        path="/application-gallery/:slug"
        component={ApplicationGalleryDetailLoadable}
      />
      <Route exact path="/*/:slug" component={CustomizableLoadable} />
      <Route exact path="/:slug" component={CustomizableLoadable} />
    </Switch>
  )
}

export default Main
