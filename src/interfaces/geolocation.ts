// Coordinates getting from navigation
export interface Coordinates {
  lat: number
  lng: number
}

// Geolocation hook elements
export interface Geolocation {
  loaded: boolean
  coordinates: Coordinates
  error: string
}

// Type of function that search coordinates by city name
export interface UseGeolocationReturn extends Geolocation {
  getCoordinatesByCityName: (city: string) => Promise<string>
}

// Data returned by search
export interface GeocodeResponse {
  name: string
  lat: number
  lon: number
}
