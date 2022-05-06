import React, { useEffect, useState } from 'react'

//Services
import { MovieServices } from '../../services/movies-services'

import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

//Components
import { STSimilarMovies } from './style'

export default function SimilarMovies(props) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

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
    MovieServices.getSimilarMovies(movieId).then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [movieId])

  return (
    loading && (
      <STSimilarMovies>
        <Grid sx={{ flexGrow: 1 }}>
          <Grid item xs={12}>
            <Grid justifyContent="center" container spacing={2}>
              <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlaySpeed={3000}
                  centerMode={false}
                  className="container"
                  containerClass="container-with-dots"
                  dotListClass="dotList"
                  draggable
                  focusOnSelect={true}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={responsive}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable

              >
                {movies.results.map((movie) => (
                  <Grid key={movie.id} item className='grid-card'>
                    <Card sx={{ maxWidth: 345 }} className="card">
                      {movie ? (
                        <CardMedia
                          className="poster"
                          component="img"
                          alt="image of film"
                          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        />
                      ) : (
                        <Skeleton variant="rectangular" width={210} height={118} />
                      )}

                      {movie ? (
                        <>
                          <CardContent className="description">
                            <Typography gutterBottom variant="h5" component="div">
                              {movie.title}
                            </Typography>
                            <Typography
                              className="text-description"
                              variant="body2"
                              color="text.secondary"
                            >
                              {movie.overview}
                            </Typography>
                          </CardContent>
                          <CardActions className="content-buttons">
                            <Button size="small">Share</Button>

                            <MenuItem as={Link} to={`/details/${movie.id}`}>
                              <Button size="small">Saber más</Button>
                            </MenuItem>
                          </CardActions>
                        </>
                      ) : (
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
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
