import {
  Box,
  Center,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import {FC} from 'react'

import {useWeather} from '../../context/weatherContext/weatherContext'

import CurrentWeatherPanel from './panels/currentWeatherPanel'
import DaysWeatherPanel from './panels/daysWeatherPanle'
import HoursWeatherPanel from './panels/hoursWeatherPanel'

const WeatherPage: FC = () => {
  const {isLoading, error} = useWeather()

  if (isLoading) {
    return (
      <Center w='full' h='100vh'>
        <Spinner />
      </Center>
    )
  }

  if (error !== '') {
    throw new Error(error)
  }

  return (
    <Box w='full' mt='8'>
      <Heading as='h1'>Погода</Heading>
      <Tabs isFitted>
        <TabList>
          <Tab>Сейчас</Tab>
          <Tab>По часам</Tab>
          <Tab>По дням</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CurrentWeatherPanel />
          </TabPanel>
          <TabPanel>
            <HoursWeatherPanel />
          </TabPanel>
          <TabPanel>
            <DaysWeatherPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default WeatherPage
