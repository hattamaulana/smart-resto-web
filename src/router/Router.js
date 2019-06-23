import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Root from '../view/Root'
import Preview from '../view/order/Preview'
import Queue from '../view/kitchen/Queue'
import Add from '../view/menu/Add'

function RouteApp() {
  return (
    <Router>
      <Route exact path="/" component={Root} />
      <Route exact path="/menu/new" component={Add} />
      <Route exact path="/order/preview" component={Preview} />
      <Route exact path="/kitchen/queue" component={Queue} />
    </Router>
  )
}

export default RouteApp
