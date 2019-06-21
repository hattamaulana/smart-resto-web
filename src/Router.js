import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function RouteApp() {
   return (
      <Router>
         <Route path="/" />
         <Route path="/order/preview" />
         <Route path="/order/add" />
         <Route path="/kitchen" />
      </Router>
  )
}

export default RouteApp
