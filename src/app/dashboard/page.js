import { fetchAuthUser } from '@/actions';
import LogOut from '@/components/logout';
import { redirect } from 'next/navigation';
import React from 'react'

const DashBoard = async () => {
  const currentUser = await fetchAuthUser();
  console.log(currentUser);
  if(currentUser?.success === false){
    redirect("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{currentUser?.data?.userName}</p>
      <p>{currentUser?.data?.email}</p>
      <LogOut/>
    </div>
  )
}

export default DashBoard