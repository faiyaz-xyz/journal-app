"use client"

import { useSelector } from "react-redux"
import React from 'react'
import AuthGuard from "@/components/AuthGuard"

const Journal = () => {
  const userData = useSelector((state: any) => state.userData.user)
  console.log(userData)

  return (
    <div>
      <h1>{userData?.displayName}</h1>
      <img src={userData?.photoURL} alt="pfp" />
    </div>
  )
}

export default function JournalPageWrapper() {
  return (
    <AuthGuard>
      <Journal />
    </AuthGuard>
  )
}
