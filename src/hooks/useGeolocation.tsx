import axios, {isAxiosError} from 'axios'
import {useEffect, useState} from 'react'

import {
  GeocodeResponse,
  UseGeolocationReturn,
  Geolocation
} from '../interfaces/geolocation'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ''

// useGeolocation get user geolocation and save it to local storage
// return error if user abort getting geolocation
const useGeolocation = (): UseGeolocationReturn => {
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

  const getCoordinatesByCityName = async (city: string): Promise<string> => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}&lang=ru&limit=1`
    setLocation(state => ({...state, loaded: false}))
    try {
      const response = await axios<GeocodeResponse[]>(url)
      if (!response.data.length) {
        setLocation(state => ({...state, loaded: true}))
        return "Can't found coordinates"
      }
      const data = response.data[0]
      setLocation({
        coordinates: {lat: data.lat, lng: data.lon},
        loaded: true,
        error: ''
      })
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          coordinates: {lat: data.lat, lng: data.lon}
        })
      )
    } catch (e) {
      setLocation(state => ({...state, loaded: true}))
      if (isAxiosError(e)) {
        return e.message
      }
    }
    return ''
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

  return {
    ...location,
    getCoordinatesByCityName
  }
}

export default useGeolocation
