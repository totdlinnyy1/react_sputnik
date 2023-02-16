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

const DaysWeatherPanel: FC = () => {
  return (
    <Tabs isFitted>
      <TabPanels>
        <TabPanel>
          <Weather
            description='hfdios'
            image='cloud.webp'
            temp={-24}
            wind={20}
            pressure={12}
            humidity={213}
          />
        </TabPanel>
      </TabPanels>
      <TabList>
        <Tab>
          <VStack>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>Сегодня</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>Завтра</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>Вторник</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>Среда</Text>
          </VStack>
        </Tab>
        <Tab>
          <VStack alignItems='center'>
            <Icon as={WiDaySunny} color='yellow' boxSize='10' />
            <Heading as='h6' size='md'>
              -24
            </Heading>
            <Text>Четверг</Text>
          </VStack>
        </Tab>
      </TabList>
    </Tabs>
  )
}

export default DaysWeatherPanel
