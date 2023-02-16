import {useEffect, useState} from 'react'

interface Coordinates {
  lat: number
  lng: number
}

interface Geolocation {
  loaded: boolean
  coordinates: Coordinates
  error: string
}

// useGeolocation get user geolocation and save it to local storage
// return error if user abort getting geolocation
const useGeolocation = (): Geolocation => {
  const storageKey = 'geolocation'

  const [location, setLocation] = useState<Geolocation>({
    loaded: false,
    coordinates: {lat: 0, lng: 0},
    error: ''
  })

  const onSuccess: PositionCallback = (loc): void => {
    setLocation(state => ({
      ...state,
      loaded: true,
      coordinates: {lat: loc.coords.latitude, lng: loc.coords.longitude}
    }))
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        coordinates: {lat: loc.coords.latitude, lng: loc.coords.longitude}
      })
    )
  }

  const onError: PositionErrorCallback = (positionError): void => {
    setLocation(state => ({
      ...state,
      loaded: true,
      error: positionError.message
    }))
  }
  useEffect(() => {
    const retrievedGeolocation = localStorage.getItem(storageKey)
    if (retrievedGeolocation) {
      const parsedGeolocation: Geolocation = JSON.parse(retrievedGeolocation)
      setLocation({...parsedGeolocation, error: '', loaded: true})
      return
    }
    if (!('geolocation' in navigator)) {
      setLocation(state => ({
        ...state,
        loaded: true,
        error: 'navigator is not have member geolocation'
      }))
      return
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return location
}

export default useGeolocation
