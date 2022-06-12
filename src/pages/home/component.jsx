import React, { useEffect, useState, useContext } from 'react'

// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component'

// Material UI
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// Services
import { MovieServices } from '../../services/movies-services'

// Utils
import { MyGlobalStateContext } from '../../utils/globalState'

// Components
import CardMovies from '../../components/card-movies/component'
import SearchPage from '../search/component'
import SnackbarComponent from '../../components/snackbar/component'
import Footer from '../../components/footer/component'

// Styles
import { STHome } from './style'

export default function Home(props) {
  // States
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(true)

  // Context
  const { show, setShow } = useContext(MyGlobalStateContext)

  // Props
  const { user, searchText } = props

  // UseEffect for fetch trending movies
  useEffect(() => {
    MovieServices.getTrendingsMovies(page).then((film) => {
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

  // Function for open snackbar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
    setShow(false)
  }

  return (
    <>
      <STHome>
        {show ? (
          <SnackbarComponent
            message="Contraseña actualizada, vuelva a iniciar sesión"
            open={openSnackbar}
            severity="success"
            handleClose={handleCloseSnackBar}
          />
        )
          : null}
        <InfiniteScroll
          dataLength={movies.length}
          hasMore={hasMore}
          next={handleNextPage}
          loader={loading ? (
            <Box className="progress" sx={{ display: 'flex' }}>
              {loading ? <CircularProgress /> : null}
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
      <footer>
        <Footer />
      </footer>

    </>

  )
}
