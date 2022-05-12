import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// MaterialUI
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Avatar from '@mui/material/Avatar'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Styles
import { STCardMovies } from './style'

// Services
import { FavServices } from '../../services/fav-services'
import { PendingWatchServices } from '../../services/pending-watch-services'
import { MovieServices } from '../../services/movies-services'

// Components
import CardMediaComponent from '../card-media/component'
import CardContentComponent from '../card-content/component'

// eslint-disable-next-line react/prop-types
export default function CardMovies({
  movies, loading, title, className, user,
}) {
  const [favorite, setFavorite] = useState([])
  const [favs, setFavs] = useState([])

  const handleFav = (movie) => {
    FavServices.addFavs(movie.id)
    setFavorite([...favorite, movie.id])
  }
  const getMoviesFavs = async () => {
    if (favs.length > 0) {
      const unresolvedPromises = favs.map((fav) =>
        MovieServices.getMovie(fav.credential))
      const results = await Promise.all(unresolvedPromises)
      setFavorite(results)
    }
  }
  useEffect(() => {
    FavServices.getFavs().then((i) => {
      setFavs(i)
    })
  }, [])

  useEffect(() => {
    getMoviesFavs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favs])

  const handlePending = (movie) => {
    PendingWatchServices.addPending(movie.id)
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0c0735',
      },
      fav: {
        main: '#ff0000',
      },
    },
  })

  const favoriteMovies = (index, movie) => {
    if (favs > 0 && favs[index].credential !== movie.id) {
      console.log('favs', favs[index].credential)
      console.log('movies', movie.id)
      return true
    }
    return false
  }

  return (
    <STCardMovies className={className}>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">{title}</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie, index) =>
              (
                <Grid key={movie.id} item>
                  <Card sx={{ maxWidth: 345 }} className="card">
                    <CardMediaComponent movie={movie} loading={loading} className="skeleton" />

                    {!loading ? (
                      <>
                        <CardContentComponent movie={movie} />
                        <CardActions className="content-buttons">
                          {user && (
                          <>
                            <ThemeProvider theme={theme}>
                              {!favoriteMovies(index, movie) ? (
                                <Tooltip title="Añadir a favoritos">
                                  <FavoriteIcon
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                      handleFav(movie)
                                    }}
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Quitar de favoritos">
                                  <FavoriteIcon
                                    color="fav"
                                    size="small"
                                    onClick={() => {}}
                                  />
                                </Tooltip>
                              )}
                            </ThemeProvider>

                            <Tooltip title="Añadir a pendientes">
                              <VisibilityOffIcon
                                onClick={() => {
                                  handlePending(movie)
                                }}
                              />
                            </Tooltip>

                            <Tooltip title="Añadir a vistas">
                              <RemoveRedEyeIcon />
                            </Tooltip>
                          </>
                          )}

                          <MenuItem as={Link} to={`/details/${movie.id}`}>
                            <Typography className="more">Saber más</Typography>
                          </MenuItem>
                        </CardActions>
                      </>
                    ) : (
                      <Box className="skeleton-animation" sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton width="80%" />
                        <Skeleton width="60%" />
                        <Skeleton variant="circular">
                          <Avatar />
                        </Skeleton>
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </STCardMovies>
  )
}
