import React, { useEffect, useState } from 'react'

// Scroller
import InfiniteScroll from 'react-infinite-scroll-component'

// MaterialUI
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// Services
import { MovieServices } from '../../services/movies-services'

// Components
import CardMovies from '../../components/card-movies/component'

// Style
import { STSearch } from './style'

export default function SearchPage({
  user, debounce,
}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    MovieServices.getSearchMovies(debounce, page).then((film) => {
      setMovies((prevMovies) =>
        prevMovies.concat(film.results))
      setHasMore(film.page < film.total_pages)
      setLoading(false)
    })
      .catch((err) =>
        console.log(err))
  }, [debounce, page])

  const handleNextPage = () => {
    setPage((prevPage) =>
      prevPage + 1)
  }

  return (

    <STSearch>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={handleNextPage}
        loader={(
          <Box className="progress" sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
)}
      >
        <CardMovies movies={movies} loading={loading} title="Tu busqueda: " user={user} />
      </InfiniteScroll>
    </STSearch>
  )
}
