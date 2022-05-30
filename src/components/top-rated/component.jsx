import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// MaterialUI
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import { ThemeProvider } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import FavoriteIcon from '@mui/icons-material/Favorite'

// Services
import { RatingServices } from '../../services/rating-services'
import { MovieServices } from '../../services/movies-services'
import { FavServices } from '../../services/fav-services'
import { PendingWatchServices } from '../../services/pending-watch-services'
import { MoviesSeenServices } from '../../services/movies-seen-services'

// Utils
import { HandlerButtonFav } from '../../utils/handler-buttons-cards/handlerButtonFav'
import { HandlerButtonPending } from '../../utils/handler-buttons-cards/handlerButtonPending'
import { HandlerButtonSeen } from '../../utils/handler-buttons-cards/handlerButtonSeen'

// Components
import CardMediaComponent from '../card-media/component'
import CardContentComponent from '../card-content/component'

// Styles
import { STCard, theme, themeMenuItem } from '../../styles/card-default/style'

export default function TopRated(props) {
  // States
  const [movies, setMovies] = useState([])
  const [topRated, setTopRated] = useState([])
  const [loading, setLoading] = useState(true)

  const [favs, setFavs] = useState([])
  const [credentialFav, setCredentialFav] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  const [isPending, setIsPending] = useState(false)
  const [credentialPending, setCredentialPending] = useState([])
  const [pendings, setPendings] = useState([])

  const [isSeen, setIsSeen] = useState(false)
  const [credentialSeen, setCredentialSeen] = useState([])
  const [seen, setSeen] = useState([])

  const [disabled, setDisabled] = useState(false)

  // props
  const { user, movieId } = props

  // Effects

  // Effect to get the favorites movies
  useEffect(() => {
    FavServices.getFavs(user).then((i) => {
      setFavs(i)
      setIsFavorite(false)
    })
  }, [isFavorite, user])

  // Effect to get the credentials of favorites movies
  useEffect(() => {
    HandlerButtonFav.favoriteMovies(user, favs).then((i) => {
      setCredentialFav(i)
      setIsFavorite(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favs, user])

  // Effect to get pending movies
  useEffect(() => {
    PendingWatchServices.getPending(user).then((i) => {
      setPendings(i)
      setIsPending(false)
    })
  }, [isPending, user])

  // Effect to get credentials of pending movies
  useEffect(() => {
    HandlerButtonPending.pendingsMovies(user, pendings).then((i) => {
      setCredentialPending(i)
      setIsPending(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendings, user])

  // Effect to get credentials of seen movies
  useEffect(() => {
    HandlerButtonSeen.seenMovies(user, seen).then((i) => {
      setCredentialSeen(i)
      setIsSeen(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, user])

  // Effect to get the seen movies
  useEffect(() => {
    MoviesSeenServices.getMovieSeen(user).then((i) => {
      setSeen(i)
      setIsSeen(false)
    })
  }, [isSeen, user])

  // Function to get the top rated movies
  const getMoviesTopRated = async () => {
    if (topRated.length > 0) {
      const unresolvedPromises = topRated.map((top) =>
        MovieServices.getMovie(top.credential))
      const results = await Promise.all(unresolvedPromises)
      setMovies(results)
      setLoading(false)
    }
  }

  // Effect to get the top rated movies
  useEffect(() => {
    RatingServices.getTopRated().then((film) => {
      setTopRated(film)
    })
  }, [])

  // Effect call the function to get the top rated movies
  useEffect(() => {
    getMoviesTopRated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topRated])

  return (
    <STCard>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h1 className="title">Mejor valoradas</h1>
          <Grid container spacing={2} className="grid">
            {movies?.map((movie) =>
              (
                <Grid key={movie.id} item>
                  <Card sx={{ maxWidth: 345 }} className="card">
                    <CardMediaComponent movie={movie} className="skeleton" loading={loading} />
                    {!loading ? (
                      <>
                        <CardContentComponent movie={movie} />
                        <CardActions className="content-buttons">
                          {user && (
                          <ThemeProvider theme={theme}>
                            {!credentialFav.includes(movie.id) ? (
                              <Tooltip title="Añadir a favoritos">
                                <IconButton
                                  onClick={() => {
                                    HandlerButtonFav.handleFav(movie)
                                    setIsFavorite(!isFavorite)
                                  }}
                                  aria-label="add to favorites"
                                >
                                  <FavoriteIcon
                                    key={movie.id}
                                    color="primary"
                                    size="small"
                                  />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Quitar de favoritos">
                                <IconButton
                                  onClick={() => {
                                    HandlerButtonFav.handleRemoveFav(favs, movie.id)
                                    setIsFavorite(!isFavorite)
                                  }}
                                  aria-label="remove to favorites"
                                >
                                  <FavoriteIcon
                                    key={movie.id}
                                    color="fav"
                                    size="small"
                                  />
                                </IconButton>
                              </Tooltip>
                            )}

                            {!credentialPending.includes(movie.id) ? (
                              <Tooltip title="Añadir a pendientes">
                                <span>
                                  <IconButton
                                    disabled={!!credentialSeen.includes(movie.id)}
                                    onClick={() => {
                                      HandlerButtonPending.handlePending(movie)
                                      setIsPending(!isPending)
                                      setDisabled(!disabled)
                                    }}
                                    aria-label="add to pending"
                                  >
                                    <VisibilityOffIcon
                                      color="primary"
                                      size="small"
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Borrar de pendientes">
                                <span>
                                  <IconButton
                                    disabled={!!credentialSeen.includes(movie.id)}
                                    onClick={() => {
                                      HandlerButtonPending.handleRemovePending(pendings, movie.id)
                                      setIsPending(!isPending)
                                      setDisabled(!disabled)
                                    }}
                                    aria-label="remove to pending"
                                  >
                                    <DeleteSweepIcon color="disabled" />
                                  </IconButton>
                                </span>
                              </Tooltip>

                            )}
                            {!credentialSeen.includes(movie.id) ? (
                              <Tooltip title="Añadir a vistas">
                                <span>
                                  <IconButton
                                    disabled={!!credentialPending.includes(movie.id)}
                                    onClick={() => {
                                      HandlerButtonSeen.handleSeen(movie)
                                      setIsSeen(!isSeen)
                                      setDisabled(!disabled)
                                    }}
                                    aria-label="add to seen"
                                  >
                                    <RemoveRedEyeIcon
                                      color="primary"
                                      size="small"
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Borrar de vistas">
                                <span>
                                  <IconButton
                                    disabled={!!credentialPending.includes(movie.id)}
                                    onClick={() => {
                                      HandlerButtonSeen.handleRemoveSeen(seen, movie.id)
                                      setIsSeen(!isSeen)
                                      setDisabled(!disabled)
                                    }}
                                    aria-label="remove to seen"
                                  >
                                    <DeleteSweepIcon color="disabled" />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            )}
                          </ThemeProvider>
                          )}
                          <ThemeProvider theme={themeMenuItem}>
                            <MenuItem as={Link} to={`/details/${movie.id}`}>
                              <Typography className="more">Saber más</Typography>
                            </MenuItem>
                          </ThemeProvider>
                        </CardActions>

                      </>
                    ) : (
                      <Box className="skeleton2" sx={{ pt: 0.5 }}>
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
    </STCard>
  )
}
