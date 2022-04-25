import { API_KEY, API_URL } from './setting'
//get the trending movies

const getTrendingsMovies = async () => {
  const apiUrl = `${API_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

//get the next movies

const getNextMovies = async () => {
  const apiUrl = `${API_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1?region=spain`

  const res = await fetch(apiUrl)
  const apiResponse = await res.json()

  return apiResponse
}

export const MovieServices = {
  getTrendingsMovies,
  getNextMovies,
}
