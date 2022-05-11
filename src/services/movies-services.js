import { API_KEY, API_URL } from './setting'

// get the trending movies

const getTrendingsMovies = async () => {
  const apiUrl = `${API_URL}/popular?api_key=${API_KEY}&language=es-ES?region=spain`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get the next movies

const getNextMovies = async () => {
  const apiUrl = `${API_URL}/upcoming?api_key=${API_KEY}&language=es-ES&page=1?region=spain`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

// get the now playing movies

const getNowPlayingMovies = async () => {
  const apiUrl = `${API_URL}/now_playing?api_key=${API_KEY}&language=es-ES&page=1?region=spain`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

const getDetails = async (movieId) => {
  const apiUrl = `${API_URL}/${movieId}?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

const getCredits = async (movieId) => {
  const apiUrl = `${API_URL}/${movieId}/credits?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

const getVideos = async (movieId) => {
  const apiUrl = `${API_URL}/${movieId}/videos?api_key=${API_KEY}&language=es-ES`

  const res = await fetch(apiUrl, { credentials: 'omit' })
  const apiResponse = await res.json()

  if (apiResponse.results.length > 0) {
    return apiResponse
  }
  const apiUrlEU = `${API_URL}/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  const resEU = await fetch(apiUrlEU, { credentials: 'omit' })
  const apiResponseEU = await resEU.json()
  return apiResponseEU
}

const getProviders = async (movieId) => {
  const apiUrl = `${API_URL}/${movieId}/watch/providers?api_key=${API_KEY}`
  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

const getSimilarMovies = async (movieId) => {
  const apiUrl = `${API_URL}/${movieId}/similar?api_key=${API_KEY}&language=es-ES&page=1?region=spain`
  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

const getMovie = async (movieId) => {
  const apiUrl = `${API_URL}/${movieId}?api_key=${API_KEY}&language=es-ES`
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
}
