"use client"
import React from 'react'
import { Button } from '../ui/button'
import { logOut } from '@/actions'

const LogOut = () => {
    const handleLogOut = ()=>{
        logOut();
    }
  return (
    <div>
        <Button onClick={handleLogOut}>Log-Out</Button>
    </div>
  )
}

export default LogOut