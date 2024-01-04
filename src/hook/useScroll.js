import { useState, useEffect } from "react"

const useScroll = () => {
  const [distance, setDistance] = useState(0)

  const handleScroll = () => {
    const _distance = window.scrollY
    setDistance(_distance)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    distance
  }
}

export default useScroll