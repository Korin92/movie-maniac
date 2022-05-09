import {useEffect, useState} from 'react'
import {MovieServices} from '../../services/movies-services'
import CardMovies from '../../components/card-movies/component'

export default function Home() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    MovieServices.getTrendingsMovies().then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [])

  return (
    <CardMovies movies={movies.results} loading={loading} title='Las más populares' />
  )
}
