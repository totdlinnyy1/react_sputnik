import axios from 'axios'

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY || ''

// GifService is service with method that can fetch random gif from giphy api
export default class GifService {
  // fetchGifUrl return url of random gif with webp format
  static async fetchGifUrl(): Promise<string> {
    const response = await axios(
      `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=&rating=g`
    )
    const {data} = response.data
    return data.images.original.webp
  }
}
