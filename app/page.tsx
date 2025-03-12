"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}

