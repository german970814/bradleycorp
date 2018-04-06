import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../../lib/components/Loading/Loading'

const BlogLandingPageLoadable = Loadable({
  loader: () =>
    import('../../../../lib/containers/Pages/BlogLandingPage/BlogLandingPage'),
  loading: Loading
})

// Note: <Route exact path="/post/:slug" component={...} /> ie Blog post route
// will use right sidebar template and get blog_sidebar

const Main = props => {
  return (
    <Switch>
      <Route exact path="/" component={BlogLandingPageLoadable} />
    </Switch>
  )
}

export default Main
