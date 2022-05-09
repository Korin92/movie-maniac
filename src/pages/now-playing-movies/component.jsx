import {useEffect, useState} from 'react'
import {MovieServices} from '../../services/movies-services'
import CardMovies from '../../components/card-movies/component'

export default function NowPlayingMoviesPage() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    MovieServices.getNowPlayingMovies().then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [])

  return  <CardMovies movies={movies.results} loading={loading} title='Cartelera' />
}
