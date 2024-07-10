"use client"
import React, { useState } from 'react'
import { initialLoginData, LoginformControls } from '../utils'
import { Button } from '@/components/ui/button';
import { loginAction } from '@/actions';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState(initialLoginData);
  console.log(loginData);
  const [loginLoding, setLoginLoading] = useState(false);
  const handleLogin = async ()=>{
    setLoginLoading(true);
    const result = await loginAction(loginData);
    if(result?.success){
      router.push("/dashboard");
    }
    setLoginData(initialLoginData);
    setLoginLoading(false);
  }
  const handleloginFormValid = ()=>{
    return Object.keys(loginData).every((key)=>loginData[key].trim() !== "");
  }
  return (
    <div>
      <h1>Login</h1>
      <form action={handleLogin}>
        {
          LoginformControls.map((item, index)=>{
            return<div key={index}>
              <label>{item.label}</label>
              <input type={item.type} name={item.name} placeholder={item.placeholder} value={loginData[item.name]} onChange={(e)=> setLoginData({
                 ...loginData,
                [item.name]: e.target.value,
              })}/>
            </div>
          })
        }
        <Button type="submit" className="disabled:opacity-50" disabled={!handleloginFormValid()}>{
          loginLoding ? "Logining" : "Login"}</Button>
      </form>
    </div>
  )
}

export default Login