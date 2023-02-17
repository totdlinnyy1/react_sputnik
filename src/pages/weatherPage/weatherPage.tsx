import {
  Box,
  Center,
  FormControl,
  Text,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import {FC, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

import {useWeather} from '../../context/weatherContext/weatherContext'

import CurrentWeatherPanel from './panels/currentWeatherPanel'
import DaysWeatherPanel from './panels/daysWeatherPanle'
import HoursWeatherPanel from './panels/hoursWeatherPanel'

const WeatherPage: FC = () => {
  const {isLoading, error, currentWeather, getNewWeather} = useWeather()

  const [city, setCity] = useState<string>('')
  const [cityError, setCityError] = useState<string>('')

  if (isLoading || !currentWeather) {
    return (
      <Center w='full' h='100vh'>
        <Spinner />
      </Center>
    )
  }

  if (error !== '') {
    throw new Error(error)
  }

  const handleClick = (): void => {
    setCityError('')
    if (city === '') {
      setCityError('Неккоректное название места')
      return
    }
    if (city === currentWeather.name) {
      setCityError('Введите название другого места')
      return
    }
    if (getNewWeather) {
      getNewWeather(city)
    }
  }

  return (
    <Box w='full' mt='8'>
      <Heading as='h1'>Погода</Heading>
      <FormControl mt={4}>
        <HStack>
          <Input
            type='text'
            placeholder='Город'
            onInput={(e): void => setCity(e.currentTarget.value)}
          />
          <IconButton
            icon={<Icon as={AiOutlineSearch} />}
            aria-label='search'
            size='md'
            onClick={handleClick}
          />
        </HStack>
        <Text fontSize='sm' color='red'>
          {cityError}
        </Text>
      </FormControl>
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
