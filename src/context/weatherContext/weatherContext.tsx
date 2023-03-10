import {isAxiosError} from 'axios'
import {createContext, FC, useContext, useEffect, useState} from 'react'

import getDaysWeatherData from '../../helpers/getDaysWeatherData'
import getHoursWeatherData from '../../helpers/getHoursWeatherData'
import useGeolocation from '../../hooks/useGeolocation'
import {ChildrenProps} from '../../interfaces/standard'
import {
  CurrentWeather,
  DaysWeather,
  HoursWeather,
  WeatherContextProps
} from '../../interfaces/weather'
import WeatherService from '../../services/weatherService/weatherService'

const WeatherContext = createContext<WeatherContextProps>({
  isLoading: true,
  error: ''
})

export const WeatherContextProvider: FC<ChildrenProps> = ({children}) => {
  const geolocation = useGeolocation()

  const defaultLat = 56.4977
  const defaultLng = 84.9744
  const [lat, setLat] = useState<number>(defaultLat)
  const [lng, setLng] = useState<number>(defaultLng)
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [hoursWeather, setHoursWeather] = useState<HoursWeather[]>()
  const [daysWeather, setDaysWeather] = useState<DaysWeather[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const fetchWeather = async (): Promise<void> => {
    try {
      const currentWeatherResponse = await WeatherService.getCurrentWeather({
        lat,
        lng
      })
      setCurrentWeather(currentWeatherResponse)
      const hoursWeatherResponse = await WeatherService.getHoursWeather({
        lat,
        lng
      })
      setHoursWeather(getHoursWeatherData(hoursWeatherResponse))
      setDaysWeather(getDaysWeatherData(hoursWeatherResponse))
      setIsLoading(false)
    } catch (e) {
      if (isAxiosError(e)) {
        setError(
          'Что-то определенно пошло не так! Надеюсь это у api что-то накрылось, а не у меня.'
        )
      }
      setIsLoading(false)
    }
  }

  const getNewWeather = async (city: string): Promise<void> => {
    await geolocation.getCoordinatesByCityName(city)
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetchWeather()
    }
    if (geolocation.loaded) {
      if (geolocation.error === '') {
        setLat(geolocation.coordinates.lat)
        setLng(geolocation.coordinates.lng)
      }
      fetchData()
    }
  }, [geolocation.loaded, lat, lng])

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        hoursWeather,
        daysWeather,
        isLoading,
        error,
        getNewWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = (): WeatherContextProps => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}
