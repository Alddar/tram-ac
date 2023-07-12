'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function Reload() {

  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh()
    }, 30000)

    return () => clearInterval(interval)
  }, [router])
    

  return <></>
}