import { API_KEY, API_URL } from './setting'

// get the trending movies

const getTrendingsMovies = async (page) => {
  const apiUrl = `${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}&region=ES`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get the next movies

const getNextMovies = async () => {
  const apiUrl = `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1?region=spain`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get the now playing movies

const getNowPlayingMovies = async (page) => {
  const apiUrl = `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}&region=ES`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get details of a movie

const getDetails = async (movieId) => {
  const apiUrl = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get credits of a movie

const getCredits = async (movieId) => {
  const apiUrl = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get videos of a movie

const getVideos = async (movieId) => {
  const apiUrl = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(apiUrl, { credentials: 'omit' })
  const apiResponse = await res.json()

  if (apiResponse.results.length > 0) {
    return apiResponse
  }
  const apiUrlEU = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  const resEU = await fetch(apiUrlEU, { credentials: 'omit' })
  const apiResponseEU = await resEU.json()
  return apiResponseEU
}

// get providers of a movie

const getProviders = async (movieId) => {
  const apiUrl = `${API_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get similiar movies of a movie

const getSimilarMovies = async (movieId) => {
  const apiUrl = `${API_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=es-ES&page=1&region=ES`
  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get a movie by id

const getMovie = async (movieId) => {
  const apiUrl = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`
  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get movies by search
const getSearchMovies = async (search, page = 1) => {
  const apiUrl = `${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${search}&page=${page}&include_adult=false`
  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

export const MovieServices = {
  getTrendingsMovies,
  getNextMovies,
  getNowPlayingMovies,
  getDetails,
  getCredits,
  getVideos,
  getProviders,
  getSimilarMovies,
  getMovie,
  getSearchMovies,
}
