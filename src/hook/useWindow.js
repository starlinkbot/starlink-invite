import { useState, useEffect } from "react"

const useWindow = () => {
  const [viewportHeight, setViewportHeight] = useState(window.visualViewport.height)

  const getViewportHeight = () => {
    const _viewportHeight = window.visualViewport.height
    setViewportHeight(_viewportHeight)
  }

  useEffect(() => {
    getViewportHeight()
    window.addEventListener("resize", getViewportHeight)
    return () => {
      window.removeEventListener("resize", getViewportHeight)
    }
  }, [])

  return {
    viewportHeight
  }
}

export default useWindow