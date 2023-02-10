import {Box, Heading, HStack, Image, Link} from '@chakra-ui/react'
import {FunctionComponent} from 'react'
import {Link as RouterLink} from 'react-router-dom'

const Header: FunctionComponent = () => {
  return (
    <Box w='full' p={2} className='defaultColor'>
      <HStack maxW='container.lg' justifyContent='space-between' mx='auto'>
        <RouterLink to='/'>
          <HStack>
            <Image src='logo.jpg' w='16' h='16' alt='berserk' />
            <Heading as='h1' fontSize='xl'>
              tot_dlinnyy
            </Heading>
          </HStack>
        </RouterLink>
        <HStack spacing='4'>
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
