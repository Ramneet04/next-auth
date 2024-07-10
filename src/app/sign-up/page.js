"use client"
import React, { useState } from 'react'
import { initialSign_upData, ResgistrationformControls } from '../utils'
import { Button } from '@/components/ui/button';
import { SignUpAction } from '@/actions';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [sign_upData, setsign_upData] = useState(initialSign_upData);
  const [signUpLoading, setsignUpLoading] = useState(false);
  console.log(sign_upData);
  const router = useRouter();
  const handleSignUpFormValid = ()=>{
    return Object.keys(sign_upData).every((key)=>sign_upData[key].trim() !== "");
  }
  const handleSignUp = async ()=>{
    setsignUpLoading(true);
    const result = await SignUpAction(sign_upData);
    console.log(result?.success);
    if(result?.success){
      router.push("/login");
    }
    setsignUpLoading(false);
    setsign_upData(initialSign_upData);
  }
  return (
    <div>
      <h1>Sign Up</h1>
      <form action={handleSignUp}>
        {
          ResgistrationformControls.map((item)=>{
            return<div>
              <label>{item.label}</label>
              <input type={item.type} name={item.name} placeholder={item.placeholder} value={sign_upData[item.name]} onChange={(e)=> setsign_upData({
                 ...sign_upData,
                [item.name]: e.target.value,
              })}/>
            </div>
          })
        }
        <Button type="submit" className="disabled:opacity-50" disabled={!handleSignUpFormValid()}>{
          signUpLoading? "Signing Up" : "Sign Up"}</Button>
      </form>
    </div>
  )
}

export default SignUp