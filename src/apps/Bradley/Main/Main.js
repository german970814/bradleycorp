import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'
import Header from '../Header/Header'

const HomeLoadable = Loadable({
  loader: () => import('../Pages/Home/Home'),
  loading: Loading
})

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

const DefaultCPTLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/DefaultCPTLandingPage/DefaultCPTLandingPage'),
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

const ResultsLoadable = Loadable({
  loader: () => import('../Pages/Results/Results'),
  loading: Loading
})

// Note: <Route exact path="/post/:slug" component={...} /> ie Blog post route
// will use right sidebar template and get blog_sidebar

/*
 * If we need the home page then we render it with a different header
 * and check the home page cookie
 *
 * If the path isnt '/', Switch will always render this component
 * which is the router for the rest of our pages
 * with the header always included
 * meaning it wont get re-rendered each time the route changes
 */
const Main = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <HomeLoadable />
        }}
      />

      <Route
        render={() => {
          return (
            <React.Fragment>
              <Header />
              <RouterInner />
            </React.Fragment>
          )
        }}
      />
    </Switch>
  )
}

const RouterInner = () => {
  return (
    <Switch>
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
      <Route exact path="/results/:query" component={ResultsLoadable} />

      {/* Post Types With Custom Templates */}
      <Route exact path="/post/:slug" component={BlogSinglePostPageLoadable} />
      <Route exact path="/product/:slug" component={ProductDetailLoadable} />

      {/* Post Types With Default Template */}
      <Route
        exact
        path="/literature/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'literature'}
            />
          )
        }}
      />
      <Route
        exact
        path="/chip/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable match={match} postType={'chip'} />
          )
        }}
      />
      <Route
        exact
        path="/case-studies/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'case-studies'}
            />
          )
        }}
      />
      <Route
        exact
        path="/technical-info/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'technical-info'}
            />
          )
        }}
      />
      <Route
        exact
        path="/news/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable match={match} postType={'news'} />
          )
        }}
      />
      <Route
        exact
        path="/faq/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable match={match} postType={'faq'} />
          )
        }}
      />
      <Route
        exact
        path="/compliance/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'compliance'}
            />
          )
        }}
      />
      <Route
        exact
        path="/video-gallery/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'video-gallery'}
            />
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
