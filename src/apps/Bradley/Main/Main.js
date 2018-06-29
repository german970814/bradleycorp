// @flow
import * as React from 'react'
import type {
  HomePageCookie,
  HomePageCookieOption
} from '../../../lib/types/cookie_types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import Loadable from 'react-loadable'
import LoadingPageSize from '../../../lib/components/Loading/LoadingPageSize/LoadingPageSize'
import ScrollToTop from '../../../lib/components/ScrollToTop/ScrollToTop'
import ErrorBoundary from '../../../lib/containers/ErrorBoundary/ErrorBoundary'
import Header from '../Header/Header'

const HomeLoadable = Loadable({
  loader: () => import('../Pages/Home/Home'),
  loading: LoadingPageSize
})

const CustomizableLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/Customizable/Customizable'),
  loading: LoadingPageSize
})

const BlogSinglePostPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/BlogSinglePostPage/BlogSinglePostPage'),
  loading: LoadingPageSize
})

const DefaultCPTLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/DefaultCPTLandingPage/DefaultCPTLandingPage'),
  loading: LoadingPageSize
})

const CaseStudyLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/CaseStudyLandingPage/CaseStudyLandingPage'),
  loading: LoadingPageSize
})

const ChipSampleLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/ChipSampleLandingPage/ChipSampleLandingPage'),
  loading: LoadingPageSize
})

const LiteratureLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/LiteratureLandingPage/LiteratureLandingPage'),
  loading: LoadingPageSize
})

const NewsLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/NewsLandingPage/NewsLandingPage'),
  loading: LoadingPageSize
})

const TechInfoLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/TechInfoLandingPage/TechInfoLandingPage'),
  loading: LoadingPageSize
})

const VideoGalleryLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/CPTLandingPages/CustomLandingPages/VideoGalleryLandingPage/VideoGalleryLandingPage'),
  loading: LoadingPageSize
})

const ProductDetailLoadable = Loadable({
  loader: () => import('../Pages/ProductDetail/ProductDetail'),
  loading: LoadingPageSize
})

const ProductCategoryLoadable = Loadable({
  loader: () => import('../Pages/ProductCategory/ProductCategory'),
  loading: LoadingPageSize
})

const LiteratureAndChipSamplesLoadable = Loadable({
  loader: () =>
    import('../Pages/LiteratureAndChipSamples/LiteratureAndChipSamples'),
  loading: LoadingPageSize
})

const VideoGalleryLoadable = Loadable({
  loader: () => import('../Pages/VideoGallery/VideoGallery'),
  loading: LoadingPageSize
})

const ApplicationGalleryLoadable = Loadable({
  loader: () => import('../Pages/ApplicationGallery/ApplicationGallery'),
  loading: LoadingPageSize
})

const ApplicationGalleryDetailLoadable = Loadable({
  loader: () => import('../Pages/ApplicationGallery/ApplicationGalleryDetail'),
  loading: LoadingPageSize
})

const ResultsLoadable = Loadable({
  loader: () => import('../../../lib/containers/Pages/Results/Results'),
  loading: LoadingPageSize
})

const WhereToBuyPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/WhereToBuyPage/WhereToBuyPage'),
  loading: LoadingPageSize
})

const TechDataPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/TechDataPage/TechDataPage'),
  loading: LoadingPageSize
})

const NavigatorValveSizingGuidePageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/NavigatorValveSizingGuidePage/NavigatorValveSizingGuidePage'),
  loading: LoadingPageSize
})

const PartSourcePageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/PartSourcePage/PartSourcePage'),
  loading: LoadingPageSize
})

const BimRevitPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/BimRevitPage/BimRevitPage'),
  loading: LoadingPageSize
})

const ServicePartsPageLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/ServicePartsPage/ServicePartsPage'),
  loading: LoadingPageSize
})

const EfxConfiguratorLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/EfxConfigurator/EfxConfigurator'),
  loading: LoadingPageSize
})

const EmergencyValveSizingGuideLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/EmergencyValveSizingGuide/EmergencyValveSizingGuide'),
  loading: LoadingPageSize
})

const KeltechSizingGuideLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/KeltechSizingGuide/KeltechSizingGuide'),
  loading: LoadingPageSize
})

const HotWaterValvesLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/HotWaterValves/HotWaterValves'),
  loading: LoadingPageSize
})

const VirtualDesignToolLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/VirtualDesignTool/VirtualDesignTool'),
  loading: LoadingPageSize
})

const CurrentJobOpeningsLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/IframedPages/CurrentJobOpenings/CurrentJobOpenings'),
  loading: LoadingPageSize
})

// const HubspotFormsLoadable = Loadable({
//   loader: () =>
//     import('../../../lib/containers/Pages/HubspotFormPage/HubspotFormPage'),
//   loading: LoadingPageSize
// })

type Props = {
  cookies: Cookies
};

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

            let home = null
            if (!homepage) {
              home = <HomeLoadable history={history} />
            } else if (homepage === 'commercial') {
              home = <Redirect to="/commercial" />
            } else if (homepage === 'industrial') {
              home = <Redirect to="/industrial" />
            }

            return <ErrorBoundary>{home}</ErrorBoundary>
          }}
        />

        <Route
          render={() => {
            return (
              <React.Fragment>
                <Header />

                <ErrorBoundary>
                  <RouterInner />
                </ErrorBoundary>
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

      {/* Iframed Pages */}
      <Route exact path="/locator" component={WhereToBuyPageLoadable} />
      <Route exact path="/techdata" component={TechDataPageLoadable} />
      <Route
        exact
        path="/navigatorvalves/sizing-guide"
        component={NavigatorValveSizingGuidePageLoadable}
      />
      <Route exact path="/partsource" component={PartSourcePageLoadable} />
      <Route exact path="/bim" component={BimRevitPageLoadable} />
      <Route exact path="/serviceparts" component={ServicePartsPageLoadable} />
      <Route exact path="/efxconfigurator" component={EfxConfiguratorLoadable} />
      <Route exact path="/navigatorvalves/efxsize" component={EmergencyValveSizingGuideLoadable} />
      <Route exact path="/websizingguide" component={KeltechSizingGuideLoadable} />
      <Route exact path="/sizing-tankless-water-heaters" component={KeltechSizingGuideLoadable} />
      <Route exact path="/navigatorvalves/tools/EFXflow" component={HotWaterValvesLoadable} />
      <Route exact path="/virtual-design-tool" component={VirtualDesignToolLoadable} />
      <Route exact path="/careers/current-openings" component={CurrentJobOpeningsLoadable} />

      {/* Hubspot Forms */}
      {/* <Route
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
      /> */}

      {/* Post Types With Custom Templates */}
      <Route exact path="/post/:slug" component={BlogSinglePostPageLoadable} />
      <Route exact path="/product/(.*)?/:slug" component={ProductDetailLoadable} />
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
        path="/product-category/(.*)?/:slug"
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
