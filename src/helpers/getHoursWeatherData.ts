import {
  HoursWeather,
  Main,
  Weather,
  Wind
} from '../context/weatherContext/weatherContext'

import getReadableTime from './getReadableTime'

export interface HoursWeatherApiResponse {
  list: {
    dt: number
    main: Main
    weather: Weather[]
    wind: Wind
  }[]
}

const getHoursWeatherData = (data: HoursWeatherApiResponse): HoursWeather[] => {
  const MAX_ELEMENTS = 5
  const weather: HoursWeather[] = []
  for (let i = 0; i < MAX_ELEMENTS; i++) {
    if (i > MAX_ELEMENTS) {
      break
    }
    weather.push({
      dt: getReadableTime(data.list[i].dt),
      main: data.list[i].main,
      weather: data.list[i].weather,
      wind: data.list[i].wind
    })
  }
  return weather
}

export default getHoursWeatherData
