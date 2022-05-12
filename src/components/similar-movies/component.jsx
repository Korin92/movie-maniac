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

// Carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Services
import { MovieServices } from '../../services/movies-services'
import { FavServices } from '../../services/fav-services'
import { PendingWatchServices } from '../../services/pending-watch-services'
import { MoviesSeenServices } from '../../services/movies-seen-services'

// Components
import { STSimilarMovies } from './style'
import CardMediaComponent from '../card-media/component'
import CardContentComponent from '../card-content/component'

export default function SimilarMovies(props) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const { movieId } = props

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktopSmall: {
      breakpoint: {
        max: 1600,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },

    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  }

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

  const handleFav = (movie) => {
    FavServices.addFavs(movie.id)
  }

  const handlePending = (movie) => {
    PendingWatchServices.addPending(movie.id)
  }

  const handleMovieSeen = (movie) => {
    MoviesSeenServices.addMoviesSeen(movie.id)
  }

  return (
    !loading && (
      <STSimilarMovies>
        <Grid sx={{ flexGrow: 1 }}>
          <Grid item xs={12}>
            <Grid justifyContent="center" container spacing={2}>
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
                    <Grid key={movie.id} item className="grid-card">
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
                              <Tooltip title="Añadir a favoritos">
                                <FavoriteIcon
                                  className="icon-favourite"
                                  size="small"
                                  onClick={() => {
                                    handleFav(movie)
                                  }}
                                />
                              </Tooltip>

                              <Tooltip title="Añadir a pendientes">
                                <VisibilityOffIcon onClick={() => {
                                  handlePending(movie)
                                }}
                                />
                              </Tooltip>

                              <Tooltip title="Añadir a vistas">
                                <RemoveRedEyeIcon onClick={() => {
                                  handleMovieSeen(movie)
                                }}
                                />
                              </Tooltip>

                              <MenuItem as={Link} to={`/details/${movie.id}`}>
                                <Typography className="more">Saber más</Typography>
                              </MenuItem>
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
