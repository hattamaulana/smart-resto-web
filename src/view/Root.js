import React from 'react'
import { Link } from 'react-router-dom'
import './Root.css'

function Root () {
  return (
    <div class="body">
      <div class="flex-center position-ref full-height">
        <div class="content">
          <div class="title m-b-md">
            SMART-RESTO
          </div>

          <div class="links">
            <Link to="/menu">Daftar Menu</Link>
            <Link to="/order/preview">Order Preview</Link>
            <Link to="/kitchen/queue">Antrian Pesanan</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Root