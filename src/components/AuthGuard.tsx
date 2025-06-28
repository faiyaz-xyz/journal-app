"use client"

import { useSelector } from "react-redux"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const userData = useSelector((state: any) => state.userData.user)
  const router = useRouter()
  const pathname = usePathname()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userData && pathname === "/journal") {
      router.push("/login");
    }
    setLoading(false);
  }, [userData, pathname, router]);


  if (loading) return null // or loading spinner

  return <>{children}</>
}
