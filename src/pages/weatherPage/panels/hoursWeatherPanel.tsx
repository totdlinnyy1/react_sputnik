import {
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react'
import {FC} from 'react'
import {WiDaySunny} from 'react-icons/wi'

import Weather from '../../../components/weather/Weather'

const HoursWeatherPanel: FC = () => {
  return (
    <Tabs isFitted>
      <TabPanels>
        <TabPanel>
          <Weather weather='Облачно' image='cloud.webp' deg={-24} wind={20} />
        </TabPanel>
        <TabPanel>
          <Weather weather='Облачно' image='cloud.webp' deg={-24} wind={20} />
        </TabPanel>
        <TabPanel>
          <Weather weather='Облачно' image='cloud.webp' deg={-24} wind={20} />
        </TabPanel>
        <TabPanel>
          <Weather weather='Облачно' image='cloud.webp' deg={-24} wind={20} />
        </TabPanel>
        <TabPanel>
          <Weather weather='Облачно' image='cloud.webp' deg={-24} wind={20} />
        </TabPanel>
      </TabPanels>
      <TabList>
        <Tab>
          <VStack>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>12:00</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>12:00</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>12:00</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>12:00</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>12:00</Text>
          </VStack>
        </Tab>
      </TabList>
    </Tabs>
  )
}

export default HoursWeatherPanel
