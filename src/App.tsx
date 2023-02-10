import {useColorMode} from '@chakra-ui/react'
import React, {FC, useEffect} from 'react'

import Header from './components/header/Header'
import getColorMode from './helpers/getColorMode'

const App: FC = () => {
  const {setColorMode} = useColorMode()

  useEffect(() => {
    setColorMode(getColorMode())
  })
  return (
    <>
      <Header />
    </>
  )
}

export default App
