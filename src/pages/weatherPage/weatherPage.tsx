import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import {FC} from 'react'

import CurrentWeatherPanel from './panels/currentWeatherPanel'

const WeatherPage: FC = () => {
  return (
    <Box w='full' mt='8'>
      <Heading as='h1'>Погода</Heading>
      <Tabs isFitted color='component-primary'>
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
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default WeatherPage
