import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '../../../lib/components/Loading/Loading'
import Home from '../Pages/Home/Home'

const ProductDetailLoadable = Loadable({
  loader: () => import('../Pages/ProductDetail/ProductDetail'),
  loading: Loading
})

const LiteratureAndChipSamplesLoadable = Loadable({
  loader: () =>
    import('../Pages/LiteratureAndChipSamples/LiteratureAndChipSamples'),
  loading: Loading
})

const CustomizableLoadable = Loadable({
  loader: () =>
    import('../../../lib/containers/Pages/Customizable/Customizable'),
  loading: Loading
})

// Note: <Route exact path="/post/:slug" component={...} /> ie Blog post route
// will use right sidebar template and get blog_sidebar

const Main = props => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:slug" component={ProductDetailLoadable} />
      <Route
        exact
        path="/literature-and-chip-samples"
        component={LiteratureAndChipSamplesLoadable}
      />
      <Route exact path="/*/:slug" component={CustomizableLoadable} />
      <Route exact path="/:slug" component={CustomizableLoadable} />
    </Switch>
  )
}

export default Main
