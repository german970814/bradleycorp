import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'

const Home = Loadable({
  loader: () => import('../Pages/Home/Home'),
  loading: Loading
})

const Main = props => {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  )
}

export default Main
