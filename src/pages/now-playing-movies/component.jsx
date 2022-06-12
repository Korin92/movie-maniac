import React, { useEffect, useState } from 'react'

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component'

// Material UI
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// Services
import { MovieServices } from '../../services/movies-services'

// Components
import CardMovies from '../../components/card-movies/component'
import SearchPage from '../search/component'
import Footer from '../../components/footer/component'

// Styles
import { STNowPlaying } from './style'

export default function NowPlayingMoviesPage(props) {
  // States
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  // Props
  const { user, searchText } = props

  // UseEffect for get now playing movies
  useEffect(() => {
    setLoading(true)
    MovieServices.getNowPlayingMovies(page).then((film) => {
      setMovies((prevMovies) =>
        prevMovies.concat(film.results))
      setHasMore(film.page < film.total_pages)
      setLoading(false)
    })
      .catch((err) =>
        console.log(err))
  }, [page])

  // Function for pagination
  const handleNextPage = () => {
    setPage((prevPage) =>
      prevPage + 1)
  }

  return (
    <>
      <STNowPlaying>
        <InfiniteScroll
          dataLength={movies.length}
          hasMore={hasMore}
          next={handleNextPage}
          loader={loading ? (
            <Box className="progress" sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          ) : null}
        >
          {searchText.searchInput !== '' ? (
            <SearchPage user={user} />
          ) : (
            <CardMovies movies={movies} loading={loading} title="Cartelera" user={user} />
          )}
        </InfiniteScroll>
      </STNowPlaying>
      <footer>
        <Footer />
      </footer>

    </>
  )
}
