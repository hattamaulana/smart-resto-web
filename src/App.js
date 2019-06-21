import React from 'react'
import logo from './logo.svg'
import './App.css'
import React from 'react'
import { Route } from 'react-router-dom'

function App() {
  return (
     <Router>
        <Route path="/" />
        <Route path="/order/preview" />
        <Route path="/order/add" />
        <Route path="/kitchen" />
     </Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default App
