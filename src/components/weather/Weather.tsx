import {Box, Heading, Image, Text} from '@chakra-ui/react'
import {FC} from 'react'

interface Props {
  weather: string
  image: string
  deg: number
  wind: number
}
const Weather: FC<Props> = props => {
  return (
    <Box w='full'>
      <Box pos='relative'>
        <Image src={props.image} alt={props.weather} />
        <Box
          bgColor='blackAlpha.400'
          pos='absolute'
          bottom={0}
          w='full'
          color='white'
          p={1}
        >
          <Heading as='h3'>
            {props.deg}°C {props.weather}
          </Heading>
          <Text>Ветер {props.wind} м/с</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Weather
