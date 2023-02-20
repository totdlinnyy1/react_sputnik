import {Container, useColorMode} from '@chakra-ui/react'
import React, {FC, useEffect} from 'react'

import Header from './components/header/Header'
import getColorMode from './helpers/getColorMode'
import {ChildrenProps} from './interfaces/standard'

const App: FC<ChildrenProps> = ({children}) => {
  const {setColorMode} = useColorMode()

  useEffect(() => {
    setColorMode(getColorMode())
  })
  return (
    <>
      <Header />
      <Container maxW='container.lg'>{children}</Container>
    </>
  )
}

export default App
