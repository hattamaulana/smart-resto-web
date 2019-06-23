import React, { Component } from 'react'
import QRCode from 'qrcode.react'

class QR extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data
    return (
      <QRCode value={ data } renderAs='canvas' />
    )
  }
}

export default QR