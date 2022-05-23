/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
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
import IconButton from '@mui/material/IconButton'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { ThemeProvider } from '@mui/material/styles'

// Styles
import { STCard, theme, themeMenuItem } from '../../styles/card-default/style'

// Services
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

// eslint-disable-next-line react/prop-types
export default function CardMovies({
  movies, loading, title, className, user,
}) {
  // States
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

  // Effects

  //* * get favorite list and update state of favs */
  useEffect(() => {
    user && (
      FavServices.getFavs(user).then((i) => {
        setFavs(i)
        setIsFavorite(false)
      })
    )
  }, [isFavorite, user])

  //* * from favorite movies, get credential of movies
  // and update state of credentials favs, control the favorites button */
  useEffect(() => {
    HandlerButtonFav.favoriteMovies(user, favs).then((i) => {
      setCredentialFav(i)
      setIsFavorite(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favs, user])

  //* * get pending list and update state of pendings */
  useEffect(() => {
    user && (
      PendingWatchServices.getPending(user).then((i) => {
        setPendings(i)
        setIsPending(false)
      })
    )
  }, [isPending, user])

  //* * from pending movies, get credential of movies
  // and update state of credentials pendings, control the pending button */
  useEffect(() => {
    HandlerButtonPending.pendingsMovies(user, pendings).then((i) => {
      setCredentialPending(i)
      setIsPending(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendings, user])

  //* * get seen list and update state of seen */
  useEffect(() => {
    HandlerButtonSeen.seenMovies(user, seen).then((i) => {
      setCredentialSeen(i)
      setIsSeen(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, user])

  //* * from seen movies, get credential of movies
  // and update state of credentials seen, control the seen button */
  useEffect(() => {
    user && (
      MoviesSeenServices.getMovieSeen(user).then((i) => {
        setSeen(i)
        setIsSeen(false)
      })
    )
  }, [isSeen, user])

  return (
    <STCard className={className}>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">{title}</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie, index) =>
              (
                <Grid key={index} item>
                  <Card sx={{ maxWidth: 345 }} className="card">
                    <CardMediaComponent movie={movie} loading={loading} className="skeleton" />
                    {!loading ? (
                      <>
                        <CardContentComponent movie={movie} />
                        <CardActions className="content-buttons">
                          {user && (
                          <ThemeProvider theme={theme}>
                              {!credentialFav.includes(movie.id) ? (
                                <Tooltip title="Añadir a favoritos">
                                  <IconButton onClick={() => {
                                    HandlerButtonFav.handleFav(movie)
                                    setIsFavorite(!isFavorite)
                                  }}
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
                                  <IconButton onClick={() => {
                                    HandlerButtonFav.handleRemoveFav(favs, movie.id)
                                    setIsFavorite(!isFavorite)
                                  }}
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
                              <>
                                <Tooltip title="Añadir a pendientes">
                                  <span>
                                    <IconButton
                                      disabled={!!credentialSeen.includes(movie.id)}
                                      onClick={() => {
                                        HandlerButtonPending.handlePending(movie)
                                        setIsPending(!isPending)
                                        setDisabled(!disabled)
                                      }}
                                    >
                                      <VisibilityOffIcon
                                        color="primary"
                                        size="small"
                                      />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                <Tooltip title="Borrar de pendientes">
                                  <span>
                                    <IconButton
                                      disabled={!!credentialSeen.includes(movie.id)}
                                      onClick={() => {
                                        HandlerButtonPending.handleRemovePending(pendings, movie.id)
                                        setIsPending(!isPending)
                                        setDisabled(!disabled)
                                      }}
                                    >
                                      <DeleteSweepIcon color="disabled" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </>

                            )}
                            {!credentialSeen.includes(movie.id) ? (
                              <>
                                <Tooltip title="Añadir a vistas">
                                  <span>
                                    <IconButton
                                      disabled={!!credentialPending.includes(movie.id)}
                                      onClick={() => {
                                        HandlerButtonSeen.handleSeen(movie)
                                        setIsSeen(!isSeen)
                                        setDisabled(!disabled)
                                      }}
                                    >
                                      <RemoveRedEyeIcon
                                        color="primary"
                                        size="small"
                                      />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                <Tooltip title="Borrar de vistas">
                                  <span>
                                    <IconButton
                                      disabled={!!credentialPending.includes(movie.id)}
                                      onClick={() => {
                                        HandlerButtonSeen.handleRemoveSeen(seen, movie.id)
                                        setIsSeen(!isSeen)
                                        setDisabled(!disabled)
                                      }}
                                    >
                                      <DeleteSweepIcon color="disabled" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </>
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
    </STCard>
  )
}
