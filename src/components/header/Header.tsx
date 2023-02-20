import {Box, Heading, HStack, Image, Link, Show, Text} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RouterLink} from 'react-router-dom'

import useTime from '../../hooks/useTime'

const Header: FC = () => {
  const time = useTime()
  return (
    <Box w='full' p={2} className='defaultColor'>
      <HStack maxW='container.lg' justifyContent='space-between' mx='auto'>
        <Show above='sm'>
          <RouterLink to='/'>
            <HStack>
              <Image src='logo.jpg' w='16' h='16' alt='berserk' />
              <Heading as='h1' fontSize='xl'>
                tot_dlinnyy
              </Heading>
            </HStack>
          </RouterLink>
        </Show>
        <HStack spacing='4'>
          <Text>{time}</Text>
          <Link as={RouterLink} color='blue' to='/'>
            погода
          </Link>
          <Link as={RouterLink} color='blue' to='/gallery'>
            галерея
          </Link>
        </HStack>
      </HStack>
    </Box>
  )
}

export default Header
