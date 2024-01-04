import { useState, useEffect, useRef } from "react"

const useCountdown = () => {
  const timeRef = useRef()
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (time > 0) {
      timeRef.current = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } 
    return () => {
      clearTimeout(timeRef.current)
    }
  }, [time])

  const start = (duration = 60) => {
    setTime(duration)
  }

  return {
    start,
    time,
  }
}

export default useCountdown