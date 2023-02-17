import {Heading, Image, Link, VStack, Text} from '@chakra-ui/react'
import {FC} from 'react'
import {Link as RouterLink, useRouteError} from 'react-router-dom'

const ErrorPage: FC = () => {
  const error = useRouteError() as Error
  return (
    <VStack h='100vh' w='full' justifyContent='center'>
      <Image src='error.webp' w='50%' />
      <Heading as='h2' textAlign='center'>
        Что-то все поломалось...
      </Heading>
      <Text fontSize='xs' textAlign='center' color='red'>
        {error.message}
      </Text>
      <Link as={RouterLink} color='blue' to='/'>
        на главную
      </Link>
    </VStack>
  )
}

export default ErrorPage
