import axios, {isAxiosError} from 'axios'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import getDaysWeatherData from '../../helpers/getDaysWeatherData'
import getHoursWeatherData from '../../helpers/getHoursWeatherData'
import useGeolocation from '../../hooks/useGeolocation'

interface DefaultWeatherData {
  weather: Weather[]
  main: Main
  wind: Wind
}

export interface Weather {
  id: number
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export interface Wind {
  speed: number
  deg: number
}

export interface Sys {
  sunrise: number
  sunset: number
}

export interface CurrentWeather extends DefaultWeatherData {
  name: string
  sys: Sys
}

export interface HoursWeather extends DefaultWeatherData {
  dt: string
}

export interface DaysWeather extends DefaultWeatherData {
  day: string
}

interface WeatherContextProps {
  currentWeather?: CurrentWeather
  hoursWeather?: HoursWeather[]
  daysWeather?: DaysWeather[]
  isLoading: boolean
  error: string
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ''

const WeatherContext = createContext<WeatherContextProps>({
  isLoading: true,
  error: ''
})

interface ProviderProps {
  children: ReactNode
}

export const WeatherContextProvider: FC<ProviderProps> = ({children}) => {
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

  const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=ru`
  const hoursWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=ru`

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const currentWeatherResponse = await axios(currentWeatherApi)
        setCurrentWeather(currentWeatherResponse.data)
        const hoursWeatherResponse = await axios(hoursWeatherApi)
        setHoursWeather(getHoursWeatherData(hoursWeatherResponse.data))
        setDaysWeather(getDaysWeatherData(hoursWeatherResponse.data))
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
    if (geolocation.loaded) {
      if (geolocation.error === '') {
        setLat(geolocation.coordinates.lat)
        setLng(geolocation.coordinates.lng)
      }
      fetchData()
    }
  }, [geolocation.loaded])

  return (
    <WeatherContext.Provider
      value={{currentWeather, hoursWeather, daysWeather, isLoading, error}}
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
