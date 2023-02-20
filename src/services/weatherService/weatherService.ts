import axios from 'axios'

import {HoursWeatherApiResponse} from '../../helpers/getHoursWeatherData'
import {Coordinates} from '../../interfaces/geolocation'
import {CurrentWeather} from '../../interfaces/weather'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || ''

// WeatherService is service with methods that can fetch current weather and hours weather
export default class WeatherService {
  // getCurrentWeather get current weather in location
  static async getCurrentWeather(data: Coordinates): Promise<CurrentWeather> {
    const response = await axios<CurrentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lng}&appid=${API_KEY}&units=metric&lang=ru`
    )
    return response.data
  }

  // getHoursWeather get hours weather in location
  static async getHoursWeather(
    data: Coordinates
  ): Promise<HoursWeatherApiResponse> {
    const response = await axios<HoursWeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lng}&appid=${API_KEY}&units=metric&lang=ru`
    )
    return response.data
  }
}
