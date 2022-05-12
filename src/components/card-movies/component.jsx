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
  const [favs, setFavs] = useState([])
  const [credential, setCredential] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFav = (movie) => {
    setIsFavorite(!isFavorite)
    console.log('isFavoriteFav', isFavorite)
    FavServices.addFavs(movie.id)
  }

  const handleRemoveFav = (id) => {
    setIsFavorite(!isFavorite)
    const idRemove = favs.findIndex((fav) =>
      fav.credential === id)
    FavServices.removeFavs(favs[idRemove].id)
  }

  useEffect(() => {
    FavServices.getFavs().then((i) => {
      setFavs(i)
      setIsFavorite(false)
    })
  }, [isFavorite])

  const favoriteMovies = () => {
    setCredential([])
    if (favs.length > 0) {
      favs.map((fav) =>
        setCredential((prevState) =>
          [...prevState, fav.credential]))
      setIsFavorite(false)
    }
  }

  useEffect(() => {
    favoriteMovies()
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

  return (
    <STCardMovies className={className}>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">{title}</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie) =>
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
                              {!credential.includes(movie.id) ? (
                                <Tooltip title="Añadir a favoritos">
                                  <FavoriteIcon
                                    key={movie.id}
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                      handleFav(movie)
                                      setIsFavorite(!isFavorite)
                                    }}
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Quitar de favoritos">
                                  <FavoriteIcon
                                    key={movie.id}
                                    color="fav"
                                    size="small"
                                    onClick={() => {
                                      handleRemoveFav(movie.id)
                                    }}
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
