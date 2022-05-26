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

// Style
import { STSearch } from './style'

export default function SearchPage({
  user,
}) {
  const context = useContext(SearchContext)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getMoviesSearch = useCallback(async () =>
    await MovieServices.getSearchMovies(context.searchInput, null).then((film) => {
      setMovies(film.results)
      setPage(film.page)
      setTotalPages(film.total_pages)
      setLoading(false)
    })
      .catch((err) =>
        console.log(err)), [context])

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

  useEffect(() => {
    getMoviesSearch()
    setLoading(false)
    return () => {
      setMovies([])
    }
  }, [getMoviesSearch])

  return (
    <STSearch>
      <InfiniteScroll
        dataLength={movies.length}
        hasMore={totalPages}
        next={() =>
          hashMorePage(context.searchInput)}
        loader={(
          <Box className="progress" sx={{ display: 'flex' }}>
            {loading && <CircularProgress />}
          </Box>
        )}
      >
        {totalPages.length > 0 ? (
          <CardMovies movies={movies} loading={loading} title="Tu busqueda " user={user} />
        ) : (
          <div className="no-results">Sin resultados =(</div>)}
      </InfiniteScroll>
    </STSearch>
  )
}
