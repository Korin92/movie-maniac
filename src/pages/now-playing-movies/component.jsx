import {useEffect, useState} from 'react'
import {MovieServices} from '../../services/movies-services'
import CardMovies from '../../components/card-movies/component'

export default function NowPlayingMoviesPage(props) {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const {user} = props

  useEffect(() => {
    MovieServices.getNowPlayingMovies().then((movies) => {
      setMovies(movies)
      setLoading(false)
    })
  }, [])

  return  <CardMovies movies={movies.results} loading={loading} title='Cartelera' user={user} />
}
