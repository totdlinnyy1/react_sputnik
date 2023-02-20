import {DaysWeather} from '../interfaces/weather'

import {HoursWeatherApiResponse} from './getHoursWeatherData'
import getReadableData from './getReadableData'

// getDaysWeatherData get weather data from api response and converts it for components
// 40 weather values come to the input
// the weather forecast compiled for 5 days is returned
// if less or more weather comes to the input, then there will be changes in the output
const getDaysWeatherData = (data: HoursWeatherApiResponse): DaysWeather[] => {
  const MAX_ELEMENTS = data.list.length
  const DAYS = 5
  const SKIP = MAX_ELEMENTS / DAYS
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
