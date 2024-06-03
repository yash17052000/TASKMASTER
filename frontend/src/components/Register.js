import React, { useState } from 'react'
import { register } from '../utils/HandleApi'



function Register() {
    const [fullName,setFullName]=useState("")
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
  return (
    <>
    <form>
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>

    <label for="fullname"><b>Full Name</b></label>
    <input type="text" placeholder="Enter Full Name" name="fullname" id="fullname" value={fullName} 
    onChange={(e)=>setFullName(e.target.value)} required/>

    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" id="username" value={username} 
    onChange={(e)=>setusername(e.target.value)} required/>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" value={password} 
    onChange={(e)=>setpassword(e.target.value)} required/>

    <button type="submit" class="registerbtn" onClick={()=>register(fullName,username,password)}
    >Register</button>
   
  </div>

  
</form>

       </>
  )
}

export default Register
