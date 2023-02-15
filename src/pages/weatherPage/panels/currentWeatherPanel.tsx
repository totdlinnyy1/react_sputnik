import {Box, Heading, Image, Text} from '@chakra-ui/react'
import {FC} from 'react'

import {useWeather} from '../../../context/weatherContext/weatherContext'
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter'
import getReadableTime from '../../../helpers/getReadableTime'
import getRoundedTemp from '../../../helpers/getRoundedTemp'

const CurrentWeatherPanel: FC = () => {
  const {currentWeather} = useWeather()
  if (!currentWeather) {
    return <Box></Box>
  }
  return (
    <Box w='full'>
      <Box pos='relative'>
        <Image src='cloud.webp' alt='cloud' />
        <Box
          bgColor='blackAlpha.400'
          pos='absolute'
          bottom={0}
          w='full'
          color='white'
          p={1}
        >
          <Heading as='h3'>
            {getRoundedTemp(currentWeather.main.temp)}°C{' '}
            {capitalizeFirstLetter(currentWeather.weather[0].description)}
          </Heading>
          <Text>Ветер {currentWeather.wind.speed} м/с</Text>
          <Text>Влажность {currentWeather.main.humidity}%</Text>
          <Text>Давление {currentWeather.main.pressure} мбар</Text>
          <Text>
            Рассвет - {getReadableTime(currentWeather.sys.sunrise)} Закат -{' '}
            {getReadableTime(currentWeather.sys.sunset)}
          </Text>
          <Text>{currentWeather.name}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default CurrentWeatherPanel
