import React, { Component } from 'react'

import { FirebaseApp } from '../../config/Firebase'

class Add extends Component {
  constructor(props){
    super(props)
    this.firebase = new FirebaseApp()
  }
}

export default Add