import {Heading, Image, Link, VStack} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RouterLink} from 'react-router-dom'

const ErrorPage: FC = () => {
  return (
    <VStack h='100vh' w='full' justifyContent='center'>
      <Image src='error.webp' w='50%' />
      <Heading as='h2' textAlign='center'>
        Что-то все поломалось...
      </Heading>
      <Link as={RouterLink} color='blue' to='/'>
        на главную
      </Link>
    </VStack>
  )
}

export default ErrorPage
