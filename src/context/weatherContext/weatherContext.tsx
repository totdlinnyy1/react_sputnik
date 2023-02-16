import axios from 'axios'
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
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ''

const WeatherContext = createContext<WeatherContextProps>({})

interface ProviderProps {
  children: ReactNode
}

export const WeatherContextProvider: FC<ProviderProps> = ({children}) => {
  const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=56.4977&lon=84.9744&appid=${API_KEY}&units=metric&lang=ru`
  const hoursWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=56.4977&lon=84.9744&appid=${API_KEY}&units=metric&lang=ru`

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [hoursWeather, setHoursWeather] = useState<HoursWeather[]>()
  const [daysWeather, setDaysWeather] = useState<DaysWeather[]>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const currentWeatherResponse = await axios(currentWeatherApi)
        setCurrentWeather(currentWeatherResponse.data)
        const hoursWeatherResponse = await axios(hoursWeatherApi)
        setHoursWeather(getHoursWeatherData(hoursWeatherResponse.data))
        setDaysWeather(getDaysWeatherData(hoursWeatherResponse.data))
      } catch (e) {}
    }
    fetchData()
  }, [])

  return (
    <WeatherContext.Provider
      value={{currentWeather, hoursWeather, daysWeather}}
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
