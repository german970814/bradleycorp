import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../../lib/components/Loading/Loading'

const BlogLandingPageLoadable = Loadable({
  loader: () => import('../../../../lib/containers/Pages/BlogLandingPage/BlogLandingPage'),
  loading: Loading
})

const Main = props => {
  return (
    <Switch>
      <Route exact path='/' component={BlogLandingPageLoadable}/>
    </Switch>
  )
}

export default Main
