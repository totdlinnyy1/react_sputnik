import {DaysWeather} from '../context/weatherContext/weatherContext'

import {HoursWeatherApiResponse} from './getHoursWeatherData'
import getReadableData from './getReadableData'

const getDaysWeatherData = (data: HoursWeatherApiResponse): DaysWeather[] => {
  const MAX_ELEMENTS = 40
  const SKIP = 8
  const weather: DaysWeather[] = []
  for (let i = 0; i < MAX_ELEMENTS; i += SKIP) {
    weather.push({
      day: getReadableData(data.list[i].dt),
      main: data.list[i].main,
      weather: data.list[i].weather,
      wind: data.list[i].wind
    })
  }
  return weather
}

export default getDaysWeatherData
