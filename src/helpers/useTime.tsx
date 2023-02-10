import {useEffect, useState} from 'react'

const useTime = (): string => {
  const second = 1000
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date())
    }, second)
    return () => clearInterval(id)
  }, [])
  return time.toLocaleTimeString()
}

export default useTime
