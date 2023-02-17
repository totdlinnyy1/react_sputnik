import {AxiosError, isAxiosError} from 'axios'
import {createBrowserRouter} from 'react-router-dom'

import App from '../App'
import {GalleryContextProvider} from '../context/galleryContext/galleryContext'
import {WeatherContextProvider} from '../context/weatherContext/weatherContext'
import NotFound from '../pages/404/notFound'
import ErrorPage from '../pages/errorPage/errorPage'
import GalleryPage from '../pages/galleryPage/galleryPage'
import WeatherPage from '../pages/weatherPage/weatherPage'
import GifService from '../services/gifService/gifService'

import {GifLoaderResponse} from './interfaces'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WeatherContextProvider>
        <App>
          <WeatherPage />
        </App>
      </WeatherContextProvider>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/gallery',
    element: (
      <GalleryContextProvider>
        <App>
          <GalleryPage />
        </App>
      </GalleryContextProvider>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />,
    loader: async (): Promise<GifLoaderResponse> => {
      try {
        const url = await GifService.fetchGifUrl()
        return {gif: url}
      } catch (e) {
        if (isAxiosError(e)) {
          const error: AxiosError = e
          throw new Response(error.message, {status: error.status})
        }
        throw e
      }
    }
  }
])

export default router
