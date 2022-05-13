import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { MovieServices } from '../../services/movies-services'
import CardMovies from '../../components/card-movies/component'

import { STHome } from './style'

export default function Home(props) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const { user } = props

  useEffect(() => {
    setLoading(true)
    MovieServices.getTrendingsMovies(page).then((film) => {
      setMovies((prevMovies) =>
        prevMovies.concat(film.results))
      setHasMore(film.page < film.total_pages)
      setLoading(false)
    })
      .catch((err) =>
        console.log(err))
  }, [page])

  const handleNextPage = () => {
    setPage((prevPage) =>
      prevPage + 1)
  }
  return (
    <STHome>
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
        <CardMovies movies={movies} loading={loading} title="Las más populares" user={user} />
      </InfiniteScroll>
    </STHome>
  )
}
