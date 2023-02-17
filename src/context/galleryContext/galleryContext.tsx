import axios, {isAxiosError} from 'axios'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || ''

interface GalleryContextProps {
  isLoading: boolean
  error: string
  randomPhoto?: Photo
  photos?: Photo[]
  searchPhotos?: (query: string) => Promise<void>
  clearPhotos?: () => void
}

interface User {
  name: string
}

interface Urls {
  full: string
  small: string
}

interface SearchResult {
  results: Photo[]
}

export interface Photo {
  user: User
  description?: string
  alt_description: string
  urls: Urls
}

const GalleryContext = createContext<GalleryContextProps>({
  isLoading: true,
  error: ''
})

interface ProviderProps {
  children: ReactNode
}

export const GalleryContextProvider: FC<ProviderProps> = ({children}) => {
  const [randomPhoto, setRandomPhoto] = useState<Photo>()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const randomPhotoApi = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`
  const searchApi = (query: string): string =>
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${query}`

  const searchPhotos = async (query: string): Promise<void> => {
    try {
      setIsLoading(true)
      const searchPhotoResponse = await axios<SearchResult>(searchApi(query))
      setPhotos(searchPhotoResponse.data.results)
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

  const clearPhotos = (): void => setPhotos([])

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
      value={{randomPhoto, photos, isLoading, error, searchPhotos, clearPhotos}}
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
