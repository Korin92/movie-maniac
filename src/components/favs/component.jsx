import { useState, useEffect } from 'react'
import { MovieServices } from '../../services/movies-services'
import { db } from '../../utils/firebase'
import { getDocs, query, collection } from 'firebase/firestore'
import CardMovies from '../card-movies/component'

import { STCardFav } from './style'

export default function Favs() {
  const [favs, setFavs] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getFavs()
  }, [])

  const getFavs = async () => {
    const q = query(collection(db, 'favs'))
    const querySnapshot = await getDocs(q)
    const arrayFavs = []

    querySnapshot?.docs.map((movie) => {
      const data = movie.data()
      data.id = movie.id
      return arrayFavs.push(data)
    })
    setFavs(arrayFavs)
  }

  useEffect(() => {
    favs?.map((fav) =>
      MovieServices.getMovie(fav.credential).then((movie) => {
        setMovies((prevState) => [...prevState, movie])
      })
    )
    setLoading(true)
  }, [favs])

  return (
    <STCardFav>
      {' '}
      <CardMovies movies={movies} className="cards-favs" loading={loading} title="Favoritos" />
    </STCardFav>
  )
}
