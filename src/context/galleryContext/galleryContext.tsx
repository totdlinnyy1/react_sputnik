import axios, {isAxiosError} from 'axios'
import {createContext, FC, useContext, useEffect, useState} from 'react'

import {
  GalleryContextProps,
  Photo,
  SearchProps,
  SearchResult
} from '../../interfaces/gallery'
import {ChildrenProps} from '../../interfaces/standard'

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || ''

const GalleryContext = createContext<GalleryContextProps>({
  isLoading: true,
  error: '',
  totalPages: 0
})

export const GalleryContextProvider: FC<ChildrenProps> = ({children}) => {
  const [randomPhoto, setRandomPhoto] = useState<Photo>()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const randomPhotoApi = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`

  const searchPhotos = async (props: SearchProps): Promise<void> => {
    try {
      setIsLoading(true)
      const searchPhotoResponse = await axios<SearchResult>(
        `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${props.query}&page=${props.page}`
      )
      if (searchPhotoResponse.data.total_pages === 0) {
        setIsLoading(false)
        return
      }
      setPhotos(searchPhotoResponse.data.results)
      setTotalPages(searchPhotoResponse.data.total_pages)
      setIsLoading(false)
    } catch (e) {
      if (isAxiosError(e)) {
        setError(
          'Что-то определенно пошло не так! Надеюсь это у api что-то накрылось, а не у меня.'
        )
        setIsLoading(false)
      }
    }
  }

  const clearPhotos = (): void => {
    setPhotos([])
    setTotalPages(0)
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async (): Promise<void> => {
      try {
        const randomPhotoResponse = await axios<Photo>(randomPhotoApi)
        setRandomPhoto(randomPhotoResponse.data)
        setIsLoading(false)
      } catch (e) {
        if (isAxiosError(e)) {
          setError(
            'Что-то определенно пошло не так! Надеюсь это у api что-то накрылось, а не у меня.'
          )
        }
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <GalleryContext.Provider
      value={{
        randomPhoto,
        photos,
        isLoading,
        error,
        searchPhotos,
        clearPhotos,
        totalPages
      }}
    >
      {children}
    </GalleryContext.Provider>
  )
}

export const useGallery = (): GalleryContextProps => {
  const context = useContext(GalleryContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}
