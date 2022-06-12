/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-return-await */
/* eslint-disable no-undef */
import React, {
  useEffect, useState, useContext, useCallback,
} from 'react'

// Scroller
import InfiniteScroll from 'react-infinite-scroll-component'

// MaterialUI
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// Services
import { MovieServices } from '../../services/movies-services'

// Components
import CardMovies from '../../components/card-movies/component'
import SearchContext from '../../components/search/context'
import ScrollToTop from '../../components/scroll-top/component'

// Style
import { STSearch } from './style'

export default function SearchPage({
  user,
}) {
  // Context
  const context = useContext(SearchContext)
  // States
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Function for get movies by search
  const getMoviesSearch = useCallback(async () =>
    await MovieServices.getSearchMovies(context.searchInput, null).then((film) => {
      setMovies(film.results)
      setPage(film.page)
      setTotalPages(film.total_pages)
      setLoading(false)
    })
      .catch((err) =>
        console.log(err)), [context])

  // Functions for pagination
  const hashMorePage = (search) => {
    handleNextPage(search, page)
    setLoading(false)
  }

  const handleNextPage = async (search, page) => {
    const nextPage = page + 1
    return await MovieServices.getSearchMovies(search, nextPage).then((film) => {
      if (movies) {
        const loadedMovies = movies.concat(film.results)
        setMovies(loadedMovies)
        setPage(film.page)
        setLoading(false)
      }
    })
  }

  // UseEffect for get movies by search
  useEffect(() => {
    getMoviesSearch()
    setLoading(false)
    return () => {
      setMovies([])
    }
  }, [getMoviesSearch])

  return (
    <STSearch>
      <ScrollToTop />
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={totalPages}
        next={() =>
          hashMorePage(context.searchInput)}
        loader={loading ? (
          <Box className="progress" sx={{ display: 'flex' }}>
            (
            <CircularProgress />
            )
          </Box>
        ) : null}
      >
        {totalPages ? (
          <CardMovies movies={movies} loading={loading} title="Tu busqueda " user={user} />
        ) : (
          <div className="no-results">Sin resultados =(</div>
        )}
      </InfiniteScroll>
    </STSearch>
  )
}
