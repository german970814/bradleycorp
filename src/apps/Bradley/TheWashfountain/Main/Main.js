import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../../Header/Header'
import Loadable from 'react-loadable'
import Loading from '../../../../lib/components/Loading/Loading'
import ErrorBoundary from '../../../../lib/containers/ErrorBoundary/ErrorBoundary'
import ScrollToTop from '../../../../lib/components/ScrollToTop/ScrollToTop'
import Error404 from '../../../../lib/components/Error/Error404/Error404'

const BlogLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../../lib/containers/Pages/BlogLandingPage/BlogLandingPage'),
  loading: Loading
})

const BlogSinglePostPageLoadable = Loadable({
  loader: () =>
    import('../../../../lib/containers/Pages/BlogSinglePostPage/BlogSinglePostPage'),
  loading: Loading
})

const ResultsLoadable = Loadable({
  loader: () => import('../../../../lib/containers/Pages/Results/Results'),
  loading: Loading
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
            <Route component={Error404} />
          </Switch>
        </ErrorBoundary>
      </ScrollToTop>
    </React.Fragment>
  )
}

export default Main
