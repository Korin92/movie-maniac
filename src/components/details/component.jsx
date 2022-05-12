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

// Styles
import { STDetails, STPoster } from './style'

// Components
import CardCast from '../card-cast/component'
import Providers from '../watch-providers/component'
import SimilarMovies from '../similar-movies/component'

export default function Details(props) {
  // States
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(true)
  const [value, setValue] = React.useState(2)

  const [video, setVideo] = useState()

  const { movieId } = useParams()
  const { user } = props

  useEffect(() => {
    MovieServices.getDetails(movieId).then((film) => {
      setMovie(film)
      setLoading(false)
    })
  }, [movieId])

  useEffect(() => {
    MovieServices.getVideos(movieId).then((film) => {
      setVideo(film.results)

      setLoading(false)
    })
  }, [movieId])

  const releasedDate = () => {
    if (!movie.release_date) {
      return 'Sin fecha'
    }
    return new Date(movie.release_date).getFullYear()
  }
  const getVideo = (videoMovie) => {
    if (videoMovie) {
      const videoKey = video.filter((item) =>
        item.type === 'Trailer')

      return videoKey[0].key
    }
    return ''
  }

  // const handleStars = (value) => {}

  return (
    <STDetails>
      <Card className="card-details">
        {!loading ? (
          <STPoster image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}>
            <Typography className="title" variant="h5" component="div">
              {movie.title}
              {' '}
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
              >
                <Rating
                  className="stars"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                  }}
                />
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
          <Typography className="content-title">Sinopsis</Typography>
          <Typography>{movie.overview}</Typography>
          <Typography className="content-title">Reparto principal</Typography>
          <CardCast movieId={movieId} />
          <Typography className="content-title">Tráiler</Typography>
          {video !== undefined && video.length > 0 ? (
            <CardMedia
              className="trailer"
              component="iframe"
              alt="trailer of movie"
              src={`https://www.youtube.com/embed/${getVideo(video)}`}
              controls
              autoPlay
              allowFullScreen
            />
          ) : (
            <Typography>No hay tráiler</Typography>
          )}

          <Typography className="content-title">¿Dónde encontrarla?</Typography>
          <Providers movieId={movieId} />
          <Typography className="content-title">Películas similares</Typography>
          <SimilarMovies movieId={movieId} />
        </CardContent>
      </Card>
    </STDetails>
  )
}
