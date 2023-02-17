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

interface SearchProps {
  query: string
  page: number
}

interface GalleryContextProps {
  isLoading: boolean
  error: string
  randomPhoto?: Photo
  photos?: Photo[]
  searchPhotos?: (query: SearchProps) => Promise<void>
  clearPhotos?: () => void
  totalPages: number
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
  total_pages: number
}

export interface Photo {
  user: User
  description?: string
  alt_description: string
  urls: Urls
}

const GalleryContext = createContext<GalleryContextProps>({
  isLoading: true,
  error: '',
  totalPages: 0
})

interface ProviderProps {
  children: ReactNode
}

export const GalleryContextProvider: FC<ProviderProps> = ({children}) => {
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
