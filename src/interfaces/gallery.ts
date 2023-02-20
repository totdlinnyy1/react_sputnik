// Needed data to search photos
export interface SearchProps {
  query: string
  page: number
}

// Gallery context elements
export interface GalleryContextProps {
  isLoading: boolean
  error: string
  randomPhoto?: Photo
  photos?: Photo[]
  searchPhotos?: (query: SearchProps) => Promise<void>
  clearPhotos?: () => void
  totalPages: number
}

// User data from api response
interface User {
  name: string
}

// Urls with photos from api response
interface Urls {
  full: string
  small: string
}

// Results of photos search
export interface SearchResult {
  results: Photo[]
  total_pages: number
}

// Photo data from api response
export interface Photo {
  user: User
  description?: string
  alt_description: string
  urls: Urls
}
