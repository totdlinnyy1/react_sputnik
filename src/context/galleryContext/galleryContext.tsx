import {isAxiosError} from 'axios'
import {createContext, FC, useContext, useEffect, useState} from 'react'

import {GalleryContextProps, Photo, SearchProps} from '../../interfaces/gallery'
import {ChildrenProps} from '../../interfaces/standard'
import GalleryService from '../../services/galleryService/galleryService'

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

  const searchPhotos = async (props: SearchProps): Promise<void> => {
    try {
      setIsLoading(true)
      const searchPhotoResponse = await GalleryService.searchPhotos(props)
      if (searchPhotoResponse.total_pages === 0) {
        setIsLoading(false)
        return
      }
      setPhotos(searchPhotoResponse.results)
      setTotalPages(searchPhotoResponse.total_pages)
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
        const randomPhotoResponse = await GalleryService.getRandomPhoto()
        setRandomPhoto(randomPhotoResponse)
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
