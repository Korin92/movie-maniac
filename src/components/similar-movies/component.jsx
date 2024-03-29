/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

// Carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Services
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
import {
  STSimilarMovies, themeMenuItem, theme, responsive,
} from './style'

export default function SimilarMovies(props) {
  // States
  const [movies, setMovies] = useState([])
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

  // Props
  const { user, movieId } = props

  // Hooks
  const navigate = useNavigate()

  // UseEffects
  /** UseEffect for get similar movies */
  useEffect(() => {
    let isMounted = true
    MovieServices.getSimilarMovies(movieId).then((film) => {
      if (isMounted) {
        setMovies(film)
        setLoading(false)
      }
      return null
    })
      .catch((err) =>
        console.log(err))

    return () => { isMounted = false }
  }, [movieId])

  /** UseEffect for get favorites */
  useEffect(() => {
    FavServices.getFavs(user).then((i) => {
      setFavs(i)
      setIsFavorite(false)
    })
  }, [isFavorite, user])

  /** UseEffect for set credentials favs */
  useEffect(() => {
    HandlerButtonFav.favoriteMovies(user, favs).then((i) => {
      setCredentialFav(i)
      setIsFavorite(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favs, user])

  /** UseEffect for get pendings */
  useEffect(() => {
    PendingWatchServices.getPending(user).then((i) => {
      setPendings(i)
      setIsPending(false)
    })
  }, [isPending, user])

  /** UseEffect for set credentials pendings */
  useEffect(() => {
    HandlerButtonPending.pendingsMovies(user, pendings).then((i) => {
      setCredentialPending(i)
      setIsPending(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendings, user])

  /** UseEffect for set credentials seen */
  useEffect(() => {
    HandlerButtonSeen.seenMovies(user, seen).then((i) => {
      setCredentialSeen(i)
      setIsSeen(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, user])

  /** UseEffect for get seen */
  useEffect(() => {
    MoviesSeenServices.getMovieSeen(user).then((i) => {
      setSeen(i)
      setIsSeen(false)
    })
  }, [isSeen, user])

  return (
    !loading && (
      <STSimilarMovies>
        <Grid sx={{ flexGrow: 1, marginTop: '4%' }}>
          <Grid item xs={12}>
            <Grid sx={{ margin: '0' }} justifyContent="center" container spacing={2}>
              <Carousel
                additionalTransfrom={0}
                arrows
                shouldResetAutoplay={false}
                autoPlaySpeed={3000}
                centerMode={false}
                className="container"
                containerClass="container-with-dots"
                dotListClass="dotList"
                draggable
                focusOnSelect={false}
                infinite
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                showDots={false}
                slidesToSlide={1}
                swipeable
              >
                {movies?.results.map((movie) =>
                  (
                    <Grid sx={{ margin: '0 23px' }} key={movie.id} item className="grid-card">
                      <Card sx={{ maxWidth: 345 }} className="card">
                        {!movie ? (
                          <>
                            <CardMediaComponent
                              movie={movie}
                              className="skeleton"
                              loading={loading}
                            />
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
                          </>
                        ) : (
                          <>
                            <CardMediaComponent movie={movie} loading={loading} />
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
                                <MenuItem
                                  onClick={() => {
                                    navigate(`/details/${movie.id}`)
                                    window.location.reload()
                                  }}
                                  component="div"
                                >
                                  <Typography component="div" className="more">Saber más</Typography>
                                </MenuItem>
                              </ThemeProvider>
                            </CardActions>
                          </>
                        )}
                      </Card>
                    </Grid>
                  ))}
              </Carousel>
            </Grid>
          </Grid>
        </Grid>
      </STSimilarMovies>
    )
  )
}
