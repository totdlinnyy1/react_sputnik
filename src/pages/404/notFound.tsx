import {Container, Heading, Image, Link, Text, VStack} from '@chakra-ui/react'
import {FC} from 'react'
import {useLoaderData, Link as RouterLink} from 'react-router-dom'

interface Props {
  gif: string
}
const NotFound: FC = () => {
  const data = useLoaderData() as Props
  return (
    <Container maxW='container.lg' h='100vh'>
      <VStack h='100vh' justifyContent='center'>
        <Image src={data.gif} alt='random gif' />
        <Heading as='h2' textAlign='center'>
          Страница не найдена :(
        </Heading>
        <Text maxW='container.sm' align='center'>
          Но чтобы Вы не грустили держите гифку, потом можете вернуться на
          главную страницу
        </Text>
        <Link as={RouterLink} color='blue' to='/'>
          на главную
        </Link>
      </VStack>
    </Container>
  )
}

export default NotFound
