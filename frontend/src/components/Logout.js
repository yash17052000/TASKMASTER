import React from 'react'
import { logout } from '../utils/HandleApi'

function Logout() {
  return (
    <div class="container">
    
         <p>Log-out icon on a button:
        <button type="button" class="btn btn-default btn-sm" onClick={()=>logout
        ()}>
          <span class="glyphicon glyphicon-log-out"></span> Log out
        </button>
      </p>
      
    </div>




  )
}

export default Logout
