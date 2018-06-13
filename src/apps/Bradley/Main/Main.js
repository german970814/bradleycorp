// @flow
import * as React from 'react'
import type {
  HomePageCookie,
  HomePageCookieOption
} from '../../../lib/types/cookie_types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'
import ScrollToTop from '../../../lib/components/ScrollToTop/ScrollToTop'
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
    import('../../../lib/containers/Pages/CPTLandingPages/DefaultCPTLandingPage/DefaultCPTLandingPage'),
  loading: Loading
})

const CaseStudyLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/CaseStudyLandingPage/CaseStudyLandingPage'),
  loading: Loading
})

const ChipSampleLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/ChipSampleLandingPage/ChipSampleLandingPage'),
  loading: Loading
})

const LiteratureLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/LiteratureLandingPage/LiteratureLandingPage'),
  loading: Loading
})

const NewsLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/NewsLandingPage/NewsLandingPage'),
  loading: Loading
})

const TechInfoLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/TechInfoLandingPage/TechInfoLandingPage'),
  loading: Loading
})

const VideoGalleryLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/VideoGalleryLandingPage/VideoGalleryLandingPage'),
  loading: Loading
})

const ProductDetailLoadable = Loadable({
  loader: () => import('../Pages/ProductDetail/ProductDetail'),
  loading: Loading
})

const ProductCategoryLoadable = Loadable({
  loader: () => import('../Pages/ProductCategory/ProductCategory'),
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
  loader: () => import('../../../lib/containers/Pages/Results/Results'),
  loading: Loading
})

const WhereToBuyPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/WhereToBuyPage/WhereToBuyPage'),
  loading: Loading
})

const HubspotFormsLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/HubspotFormPage/HubspotFormPage'),
  loading: Loading
})

type Props = {
  cookies: Cookies
}

/*
 * If we need the home page then we render it with a different header
 * and check the home page cookie
 *
 * If the path isnt '/', Switch will always render this component
 * which is the router for the rest of our pages
 * with the header always included
 * meaning it wont get re-rendered each time the route changes
 */
const Main = (props: Props) => {
  return (
    <ScrollToTop>
      <Switch>
        <Route
          exact
          path="/"
          render={({ history }) => {
            // check for cookies to take us to the correct home page
            const cookieName: HomePageCookie = 'BcorpHomePage'
            const homepage: HomePageCookieOption = props.cookies.get(cookieName)

            if (!homepage) {
              return <HomeLoadable history={history} />
            } else if (homepage === 'commercial') {
              return <Redirect to="/commercial" />
            } else if (homepage === 'industrial') {
              return <Redirect to="/industrial" />
            }
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
    </ScrollToTop>
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
      <Route exact path="/results/:query/:tab" component={ResultsLoadable} />
      <Route
        exact
        path="/results/:query/:tab/page=:page"
        component={ResultsLoadable}
      />
      <Route exact path="/locator" component={WhereToBuyPageLoadable} />

      {/* Hubspot Forms */}
      <Route
        exact
        path="/verge/washbar-sales-contact"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Washbar Sales Contact Request Form'}
              form={'washbar-sales-contact'}
            />
          )
        }}
      />
      <Route
        exact
        path="/contactus"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Contact Us Form'}
              form={'contactus'}
            />
          )
        }}
      />
      <Route
        exact
        path="/advocate/salescontact"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Advocate Sales Contact Request'}
              form={'advocate-salescontact'}
            />
          )
        }}
      />
      <Route
        exact
        path="/design-on-demand"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Design on Demand Consultation Request'}
              form={'design-on-demand'}
            />
          )
        }}
      />
      <Route
        exact
        path="/bim-services-group"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Bradley BIM Support Services Group'}
              form={'bim-services-group'}
            />
          )
        }}
      />
      <Route
        exact
        path="/evero-natural-quartz-surface/brochure"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Evero Cast-Formed Brochure Order Form'}
              form={'evero-natural-quartz-surface'}
            />
          )
        }}
      />
      <Route
        exact
        path="/safety-shower-eyewash-site-survey/form"
        render={({ match }) => {
          return (
            <HubspotFormsLoadable
              match={match}
              pageTitle={'Safety Site Survey Request'}
              form={'safety-shower-eyewash-site-survey'}
            />
          )
        }}
      />

      {/* Post Types With Custom Templates */}
      <Route exact path="/post/:slug" component={BlogSinglePostPageLoadable} />
      <Route exact path="/product/:slug" component={ProductDetailLoadable} />
      <Route
        exact
        path="/case-study/:slug"
        component={CaseStudyLandingPageLoadable}
      />
      <Route
        exact
        path="/chip/:slug"
        component={ChipSampleLandingPageLoadable}
      />
      <Route
        exact
        path="/literature/:slug"
        component={LiteratureLandingPageLoadable}
      />
      <Route exact path="/news/:slug" component={NewsLandingPageLoadable} />
      <Route
        exact
        path="/technical-info/:slug"
        component={TechInfoLandingPageLoadable}
      />
      <Route
        exact
        path="/video-gallery/:slug"
        component={VideoGalleryLandingPageLoadable}
      />

      {/* Taxonomy pages */}
      <Route
        exact
        path="/product-category/:slug"
        component={ProductCategoryLoadable}
      />

      {/* Post Types With Default Template */}

      <Route
        exact
        path="/case-study/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'case-study'}
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
        path="/warranty/:slug"
        render={({ match }) => {
          return (
            <DefaultCPTLandingPageLoadable
              match={match}
              postType={'warranty'}
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

export default withCookies(Main)
