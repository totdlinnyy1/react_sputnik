import axios from 'axios'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface Weather {
  id: number
  description: string
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface Wind {
  speed: number
  deg: number
}

interface Sys {
  sunrise: number
  sunset: number
}

interface CurrentWeather {
  name: string
  weather: Weather[]
  main: Main
  wind: Wind
  sys: Sys
}

interface HoursWeather {
  temp: number
}

interface DaysWeather {
  temp: number
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
  //const hoursWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=56.4977&lon=84.9744&appid=${API_KEY}&units=metric&lang=ru`

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [hoursWeather, setHoursWeather] = useState<HoursWeather[]>()
  const [daysWeather, setDaysWeather] = useState<DaysWeather[]>()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const currentWeatherResponse = await axios(currentWeatherApi)
        setCurrentWeather(currentWeatherResponse.data)
        //const hoursWeatherResponse = await axios(hoursWeatherApi)
        setHoursWeather(currentWeatherResponse.data)
        setDaysWeather(currentWeatherResponse.data)
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
