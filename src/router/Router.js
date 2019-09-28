import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Root from '../view/Root'
import List from '../view/menu/List'
import Queue from '../view/kitchen/Queue'
import Add from '../view/menu/Add'
import Task from '../view/waiter/Task'

function RouteApp() {
  return (
    <Router>
      <Route exact path="/" component={Root} />
      <Route exact path="/menu" component={List} />
      <Route exact path="/menu/new" component={Add} />
      <Route exact path="/waiter/task" component={Task} />
      <Route exact path="/kitchen/queue" component={Queue} />
    </Router>
  )
}

export default RouteApp
