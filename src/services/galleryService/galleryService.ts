import axios from 'axios'

import {Photo, SearchProps, SearchResult} from '../../interfaces/gallery'

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || ''

// GalleryService is service with methods that can fetch random photo or search photos by query from unsplash api
export default class GalleryService {
  // searchPhotos getting photos by query
  static async searchPhotos(data: SearchProps): Promise<SearchResult> {
    const response = await axios<SearchResult>(
      `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${data.query}&page=${data.page}`
    )
    return response.data
  }

  // searchPhotos getting random photo
  static async getRandomPhoto(): Promise<Photo> {
    const response = await axios<Photo>(
      `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`
    )
    return response.data
  }
}
