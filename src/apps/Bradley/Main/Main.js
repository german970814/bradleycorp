import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'
import Home from '../Pages/Home/Home'
// cant make this loadable because we need to pass it props
import DefaultCPTLandingPage from '../../../lib/containers/Pages/DefaultCPTLandingPage/DefaultCPTLandingPage'

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

const Main = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      {/* Specific Custom Pages */}
      <Route
        exact
        path="/literature-and-chip-samples"
        component={LiteratureAndChipSamplesLoadable}
      />
      <Route exact path="/video-gallery" component={VideoGalleryLoadable} />
      <Route
        exact
        path="/video-gallery/page=:page"
        component={VideoGalleryLoadable}
      />
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

      {/* Post Types With Custom Templates */}
      <Route exact path="/post/:slug" component={BlogSinglePostPageLoadable} />
      <Route exact path="/product/:slug" component={ProductDetailLoadable} />

      {/* Post Types With Default Template */}
      <Route
        exact
        path="/literature/:slug"
        render={({ match }) => {
          return <DefaultCPTLandingPage match={match} postType={'literature'} />
        }}
      />
      <Route
        exact
        path="/chip/:slug"
        render={({ match }) => {
          return <DefaultCPTLandingPage match={match} postType={'chip'} />
        }}
      />
      <Route
        exact
        path="/case-studies/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPage match={match} postType={'case-studies'} />
          )
        }}
      />
      <Route
        exact
        path="/technical-info/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPage match={match} postType={'technical-info'} />
          )
        }}
      />
      <Route
        exact
        path="/news/:slug"
        render={({ match }) => {
          return <DefaultCPTLandingPage match={match} postType={'news'} />
        }}
      />
      <Route
        exact
        path="/faq/:slug"
        render={({ match }) => {
          return <DefaultCPTLandingPage match={match} postType={'faq'} />
        }}
      />
      <Route
        exact
        path="/compliance/:slug"
        render={({ match }) => {
          return <DefaultCPTLandingPage match={match} postType={'compliance'} />
        }}
      />
      <Route
        exact
        path="/video-gallery/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPage match={match} postType={'video-gallery'} />
          )
        }}
      />

      {/* Any other route is sent to the Customizable Page */}
      <Route exact path="/*/page=:page" component={CustomizableLoadable} />
      <Route exact path="/*" component={CustomizableLoadable} />
    </Switch>
  )
}

export default Main
