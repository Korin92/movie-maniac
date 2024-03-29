/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// MaterialUI
import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

// Services
import { MovieServices } from '../../services/movies-services'
import { RatingServices } from '../../services/rating-services'

// Styles
import { STDetails, STPoster } from './style'
import NOIMAGEFILM from '../../assets/png/no-image-film.png'

// Components
import CardCast from '../card-cast/component'
import Providers from '../watch-providers/component'
import SimilarMovies from '../similar-movies/component'

export default function Details(props) {
  // States
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState(0)
  const [stars, setStars] = useState(0)
  const [votes, setVotes] = useState(0)
  const [video, setVideo] = useState()

  // Props
  const { movieId } = useParams()
  const { user } = props
  const { backdrop_path, poster_path } = movie

  // Constants
  const maxValue = 5
  const image = backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : NOIMAGEFILM

  // Effects

  /** Effect for get details of movie */
  useEffect(() => {
    MovieServices.getDetails(movieId).then((film) => {
      setMovie(film)
      setLoading(false)
    })
  }, [movieId])

  /** Effect for get video of movie */
  useEffect(() => {
    MovieServices.getVideos(movieId).then((film) => {
      setVideo(film.results)
      setLoading(false)
    })
  }, [movieId])

  /** Effect for get rating of movie */
  useEffect(() => {
    RatingServices.getRating(movieId).then((film) => {
      if (film) {
        setStars(film.stars)
        setVotes(film.votes)
        setValue((film.stars / film.votes))
      }
    })
  }, [value, movieId])

  // Functions

  /** Function for get age of premiere */
  const releasedDate = () => {
    if (!movie.release_date) {
      return 'Sin fecha'
    }
    return new Date(movie.release_date).getFullYear()
  }

  /** Function for get video of movie */
  const getVideo = (videoMovie) => {
    if (videoMovie) {
      const videoKey = video.filter((item) =>
        item.type === 'Trailer')

      return videoKey[0].key
    }
    return ''
  }

  // handle rating
  const handleStars = (newValue) => {
    setValue(newValue)
    setVotes(1)
    setStars(newValue)
    RatingServices.addRating(movieId, newValue)
  }

  return (
    <STDetails>
      <Card className="card-details">
        {!loading ? (
          <STPoster image={image}>
            <Typography className="title" variant="h1">
              {movie.title}
              <span />
              (
              {releasedDate()}
              )
            </Typography>

            {user && (
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
              className="container-title"
              role="group"
            >
              <fieldset className="group-rating">
                <legend>
                  <Rating
                    className="stars"
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      handleStars(newValue)
                    }}
                    max={maxValue}
                    precision={0.25}
                  />
                </legend>
              </fieldset>
              <div className="info-rating">
                <Typography variant="h2" className="text-rating">
                  votos:
                  <span />
                  {votes}
                </Typography>
                <Typography variant="h2" className="text-rating">
                  valoración media:
                  <span />
                  {stars}
                </Typography>
              </div>
            </Box>
            )}
          </STPoster>
        ) : (
          <Box className="skeleton" sx={{ pt: 0.5 }}>
            <Skeleton className="skeleton-img" variant="rectangular" />
            <Skeleton className="skeleton-title" width="80%" />
          </Box>
        )}
        <CardContent className="content">
          <Typography variant="h2" className="content-title">Sinopsis</Typography>
          <Typography className="text-sinopsis">{movie.overview}</Typography>
          <Typography variant="h2" className="content-title">Reparto principal</Typography>
          <CardCast movieId={movieId} />
          <Typography variant="h2" className="content-title">Tráiler</Typography>
          {video !== undefined && video.length > 0 ? (
            <CardMedia
              className="trailer"
              component="iframe"
              alt="trailer of movie"
              src={`https://www.youtube.com/embed/${getVideo(video)}`}
              controls
              allowFullScreen
            />
          ) : (
            <Typography>No hay tráiler</Typography>
          )}

          <Typography variant="h2" className="content-title">¿Dónde encontrarla?</Typography>
          <Providers movieId={movieId} />
          <Typography variant="h2" className="content-title">Películas similares</Typography>
          <SimilarMovies user={user} movieId={movieId} />
        </CardContent>
      </Card>
    </STDetails>
  )
}
