import {useEffect, useState} from 'react'

// useTime return current time in format hh:MM:ss
const useTime = (): string => {
  const second = 1000
  const [time, setTime] = useState<Date>(() => new Date())
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date())
    }, second)
    return () => clearInterval(id)
  }, [])
  return time.toLocaleTimeString()
}

export default useTime
