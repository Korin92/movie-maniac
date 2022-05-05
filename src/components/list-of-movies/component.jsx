import { useEffect, useState } from 'react'

import { MovieServices } from '../../services/movies-services'

import CardMovies from '../card-movies/component'

export default function ListOfMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    MovieServices.getTrendingsMovies().then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [])

  return <CardMovies movies={movies} loading={loading} />
}
