import {Box, Heading, Image, Text} from '@chakra-ui/react'
import {FC} from 'react'

const CurrentWeatherPanel: FC = () => {
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
          <Heading as='h3'>-24°C Облачно</Heading>
          <Text>Ветер 20 м/с</Text>
          <Text>Рассвет - 6:00 Закат - 19:00</Text>
          <Text>Томск</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default CurrentWeatherPanel
