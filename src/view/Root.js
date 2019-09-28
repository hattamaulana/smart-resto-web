import React from 'react'
import { Link } from 'react-router-dom'
import './Root.css'

function Root () {
  return (
    <div class="body">
      <div class="flex-center position-ref full-height">
        <div class="content">
          <div class="title m-b-md" style={{ color: '#0984E3', fontFamily: 'Raleway' }}>
            SMART-RESTO
          </div>

          <div class="links">
            <Link to="/menu" style={{ color: '#B2BEC3' }}>List Menu</Link>
            <Link to="/waiter/task" style={{ color: '#B2BEC3' }}>Waiter's Task</Link>
            <Link to="/kitchen/queue" style={{ color: '#B2BEC3' }}>Order Queue</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Root