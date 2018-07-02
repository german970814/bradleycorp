import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../../Header/Header'
import Loadable from 'react-loadable'
import LoadingPageSize from '../../../../lib/components/Loading/LoadingPageSize/LoadingPageSize'
import ErrorBoundary from '../../../../lib/containers/ErrorBoundary/ErrorBoundary'
import ScrollToTop from '../../../../lib/components/ScrollToTop/ScrollToTop'
import Error404 from '../../../../lib/components/Error/Error404/Error404'

const BlogLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../../lib/containers/Pages/BlogLandingPage/BlogLandingPage'),
  loading: LoadingPageSize
})

const BlogSinglePostPageLoadable = Loadable({
  loader: () =>
    import('../../../../lib/containers/Pages/BlogSinglePostPage/BlogSinglePostPage'),
  loading: LoadingPageSize
})

const ResultsLoadable = Loadable({
  loader: () => import('../../../../lib/containers/Pages/Results/Results'),
  loading: LoadingPageSize
})

const CustomizableLoadable = Loadable({
  loader: () =>
    import('../../../../lib/containers/Pages/Customizable/Customizable'),
  loading: LoadingPageSize
})

const Main = props => {
  return (
    <React.Fragment>
      <Header />
      <ScrollToTop>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={BlogLandingPageLoadable} />
            <Route
              exact
              path="/post/:slug"
              component={BlogSinglePostPageLoadable}
            />
            <Route exact path="/results/:query" component={ResultsLoadable} />
            <Route
              exact
              path="/results/:query/:tab"
              component={ResultsLoadable}
            />
            <Route
              exact
              path="/results/:query/:tab/page=:page"
              component={ResultsLoadable}
            />
            <Route path="/*" component={CustomizableLoadable} />
            <Route component={Error404} />
          </Switch>
        </ErrorBoundary>
      </ScrollToTop>
    </React.Fragment>
  )
}

export default Main
