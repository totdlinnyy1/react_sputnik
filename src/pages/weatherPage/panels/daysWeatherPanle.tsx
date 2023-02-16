import {
  Center,
  Heading,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react'
import {FC} from 'react'

import Weather from '../../../components/weather/Weather'
import {useWeather} from '../../../context/weatherContext/weatherContext'
import getRoundedTemp from '../../../helpers/getRoundedTemp'
import getWeatherIcon from '../../../helpers/getWeatherIcon'
import getWeatherImage from '../../../helpers/getWeatherImage'

const DaysWeatherPanel: FC = () => {
  const {daysWeather} = useWeather()

  if (!daysWeather) {
    return (
      <Center w='full' h='530px'>
        <Spinner />
      </Center>
    )
  }

  return (
    <Tabs isFitted>
      <TabPanels>
        {daysWeather.map((weather, key) => (
          <TabPanel key={key}>
            <Weather
              description={weather.weather[0].description}
              image={getWeatherImage(weather.weather[0].id)}
              temp={weather.main.temp}
              wind={weather.wind.speed}
              pressure={weather.main.pressure}
              humidity={weather.main.humidity}
            />
          </TabPanel>
        ))}
      </TabPanels>
      <TabList>
        {daysWeather.map((weather, key) => (
          <Tab key={key}>
            <VStack>
              <Image
                w='30px'
                h='30px'
                src={getWeatherIcon(weather.weather[0].icon)}
              />
              <Heading as='h6' size='xs'>
                {getRoundedTemp(weather.main.temp)}
              </Heading>
              <Text fontSize='xs'>{weather.day}</Text>
            </VStack>
          </Tab>
        ))}
      </TabList>
    </Tabs>
  )
}

export default DaysWeatherPanel
