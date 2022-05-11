import {useEffect, useState} from 'react'
import {MovieServices} from '../../services/movies-services'
import CardMovies from '../../components/card-movies/component'

export default function Home(props) {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const {user} = props

  useEffect(() => {
    MovieServices.getTrendingsMovies().then((movies) => {
      setMovies(movies)
      setLoading(false)
    })
  }, [])

  return (
    <CardMovies movies={movies.results} loading={loading} title='Las más populares' user={user} />
  )
}
