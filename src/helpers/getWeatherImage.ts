enum WeatherImage {
  THUNDERSTORM = 'thunderstorm.webp',
  DRIZZLE = 'drizzle.webp',
  RAIN = 'rain.webp',
  SNOW = 'show.webp',
  FOG = 'fog.webp',
  ATMOSPHERE = 'atmosphere.webp',
  CLEAR = 'clear.webp',
  CLOUD = 'cloud.webp',
  NOT_FOUND = 'not_found.webp'
}

const getWeatherImage = (code: number): string => {
  const thunderstorm_code_min = 200
  const thunderstorm_code_max = 232
  if (code >= thunderstorm_code_min && code <= thunderstorm_code_max) {
    return WeatherImage.THUNDERSTORM
  }

  const drizzle_code_min = 300
  const drizzle_code_max = 321
  if (code >= drizzle_code_min && code <= drizzle_code_max) {
    return WeatherImage.DRIZZLE
  }

  const rain_code_min = 500
  const rain_code_max = 531
  if (code >= rain_code_min && code <= rain_code_max) {
    return WeatherImage.RAIN
  }

  const snow_code_min = 600
  const snow_code_max = 622
  if (code >= snow_code_min && code <= snow_code_max) {
    return WeatherImage.SNOW
  }

  const atmosphere_code_min = 701
  const atmosphere_code_max = 781
  const fog_code = 741
  if (code >= atmosphere_code_min && code <= atmosphere_code_max) {
    if (code === fog_code) {
      return WeatherImage.FOG
    }
    return WeatherImage.ATMOSPHERE
  }

  const clear_code = 800
  if (code === clear_code) {
    return WeatherImage.CLEAR
  }

  const cloud_code_min = 801
  const cloud_code_max = 804
  if (code >= cloud_code_min && code <= cloud_code_max) {
    return WeatherImage.CLOUD
  }

  return WeatherImage.NOT_FOUND
}

export default getWeatherImage
