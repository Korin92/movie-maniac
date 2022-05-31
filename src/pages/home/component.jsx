import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { MovieServices } from '../../services/movies-services'
import CardMovies from '../../components/card-movies/component'

import { STHome } from './style'
import SearchPage from '../search/component'
import AlertMessage from '../../components/alert/component'
import SnackbarComponent from '../../components/snackbar/component'
import { MyEstadoGlobalContext } from '../../utils/globalState'

export default function Home(props) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(true)

  const { mostrar, setMostrar } = React.useContext(MyEstadoGlobalContext)

  const { user, searchText } = props

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

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
    setMostrar(false)
  }

  return (
    <STHome>
      {mostrar ? <SnackbarComponent message="Contraseña actualizada, vuelva a iniciar sesión" open={openSnackbar} severity="success" handleClose={handleCloseSnackBar} /> : null}
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
          <CardMovies movies={movies} loading={loading} title="Las más populares" user={user} />
        )}
      </InfiniteScroll>
    </STHome>
  )
}
