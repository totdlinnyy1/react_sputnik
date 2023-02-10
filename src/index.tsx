import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'

import reportWebVitals from './reportWebVitals'
import router from './router/router'
import {themeConfig} from './config/themeConfig'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <ChakraProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
