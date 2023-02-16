// getWeatherIcon return icon url from openweathermap api
// receives the icon id at the input
const getWeatherIcon = (icon: string): string => {
  return `http://openweathermap.org/img/wn/${icon}.png`
}

export default getWeatherIcon
