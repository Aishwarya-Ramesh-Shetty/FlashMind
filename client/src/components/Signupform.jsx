import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const Signupform = () => {
  const [name,setName] =useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmpassword,setConfirmPassword] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(password!=confirmpassword){
      alert("Passwords do not match")
      return
    }
    try{
      const res = await fetch("http://localhost:5000/api/auth/signup",{
        method : "POST",
        headers : {"Content-type":"application/json"},
        body : JSON.stringify({name,email,password})
      })

      const data = await res.json()
      if (res.ok){
        localStorage.setItem("token",data.token)
        alert("Signup successful")
      }
      else{
        alert(data.error || "Signup failed")
      }
    }
    catch(err){
      console.error(err)
      alert("Signup failed")
    }
  }

  return (
    <div className="flex justify-center items-center flex-col mt-[100px] text-xl ml-[530px]  shadow-2xl h-[500px] w-[300px]">
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col ">
        <h2 className="text-3xl font-bold mb-10">SignUp</h2>
        <input
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={(e) =>setName(e.target.value)}
          className="border-2 rounded-lg text-[#003D16] border-[#003d16]  bg-transparent mb-5"
        />
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border-2 rounded-lg border-[#003d16] text-[#003D16]  bg-transparent mb-5"
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border-2 rounded-lg border-[#003d16] text-[#003D16] bg-transparent mb-5"
        />
        <input
          type='password'
          placeholder='Enter Confirm password'
          value={confirmpassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="border-2 rounded-lg text-[#003D16] border-[#003d16]  bg-transparent mb-5"
        />
        <button className="mt-6  hover:cursor-pointer rounded-lg bg-[#268740] text-[#FFFF] h-11 w-24 mb-5">SignUp</button>
        <h2>
          Already have an account?
          <br/>
          <Link to="/login" className='flex justify-center items-center text-[#003D16]'>Login here</Link>
        </h2>
      </form>
    </div>
  )
}

export default Signupform