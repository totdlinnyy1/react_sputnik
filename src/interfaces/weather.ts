// Complete default weather data
export interface DefaultWeatherData {
  weather: Weather[]
  main: Main
  wind: Wind
}

// Description of weather
export interface Weather {
  id: number
  description: string
  icon: string
}

// Numeric data about weather
export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

// Data about wind
export interface Wind {
  speed: number
  deg: number
}

// Data about sunrise and sunset in location
export interface Sys {
  sunrise: number
  sunset: number
}

// Added city name and data about sunset and sunrise to complete data
export interface CurrentWeather extends DefaultWeatherData {
  name: string
  sys: Sys
}

// Added time to complete data
export interface HoursWeather extends DefaultWeatherData {
  dt: string
}

// Added day to complete data
export interface DaysWeather extends DefaultWeatherData {
  day: string
}

// Weather context elements
export interface WeatherContextProps {
  currentWeather?: CurrentWeather
  hoursWeather?: HoursWeather[]
  daysWeather?: DaysWeather[]
  isLoading: boolean
  error: string
  getNewWeather?: (city: string) => Promise<void>
}
