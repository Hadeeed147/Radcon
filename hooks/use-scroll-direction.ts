"use client"

import { useState, useEffect, useRef } from "react"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - lastScrollY.current) < 10) {
        ticking.current = false
        return
      }

      setScrollY(currentScrollY)

      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down")
        setIsVisible(currentScrollY < 100) // Show at top, hide when scrolling down
      } else {
        setScrollDirection("up")
        setIsVisible(true) // Always show when scrolling up
      }

      lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return { scrollDirection, isVisible, scrollY }
}
