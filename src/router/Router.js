import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Root from '../view/Root'
import Preview from '../view/order/Preview'

function RouteApp() {
   return (
      <Router>
         <Route exact path="/" component={ Root } />
         <Route path="/order/preview" component={ Preview } />
         <Route path="/order/add" />
         <Route path="/kitchen" />
      </Router>
  )
}

export default RouteApp
