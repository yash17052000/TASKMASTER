import React, { useState } from 'react'
import { login } from '../utils/HandleApi'
import App from '../App'
function Login(user,pass) {
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
  return (
    <div class="login-wrap">
  <h2>Login</h2>
  
  <div class="form">
    <input type="text" placeholder="Username" name="un" value={username} 
    onChange={(e)=>setusername(e.target.value)}/>
    <input type="password" placeholder="Password" name="pw" value={password} 
    onChange={(e)=>setpassword(e.target.value)} />
    <button onClick={()=>login(username,password)}> Sign in </button>
    
  </div>
</div>
  )
}

export default Login
