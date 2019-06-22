import React from 'react'

import { FirebaseContext } from '../config/Firebase'
import logo from './logo.svg'
import './Root.css'

function Root () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <FirebaseContext.Consumer>
           { firebase => {
                  return <div>I've access to Firebase</div>
               }
           }
        </FirebaseContext.Consumer>
      </header>
    </div>
  )
}

export default Root