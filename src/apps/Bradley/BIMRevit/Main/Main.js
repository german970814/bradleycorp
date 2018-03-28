import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../../lib/components/Loading/Loading'

const HomeLoadable = Loadable({
  loader: () => import('../Pages/Home/Home'),
  loading: Loading
})

const Main = props => {
  return (
    <Switch>
      <Route exact path='/' component={HomeLoadable}/>
    </Switch>
  )
}

export default Main
