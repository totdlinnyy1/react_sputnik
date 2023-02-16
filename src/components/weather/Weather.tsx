import {Box, Heading, Image, Text} from '@chakra-ui/react'
import {FC} from 'react'

import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter'
import getRoundedTemp from '../../helpers/getRoundedTemp'

interface Props {
  image: string
  wind: number
  temp: number
  pressure: number
  humidity: number
  description: string
}
const Weather: FC<Props> = props => {
  return (
    <Box w='full'>
      <Box pos='relative'>
        <Image
          w='full'
          h='530px'
          objectFit='cover'
          src={props.image}
          alt={props.description}
        />
        <Box
          bgColor='blackAlpha.400'
          pos='absolute'
          bottom={0}
          w='full'
          color='white'
          p={1}
        >
          <Heading as='h3'>
            {getRoundedTemp(props.temp)}°C{' '}
            {capitalizeFirstLetter(props.description)}
          </Heading>
          <Text>Ветер {props.wind} м/с</Text>
          <Text>Влажность {props.humidity}%</Text>
          <Text>Давление {props.pressure} мбар</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Weather
