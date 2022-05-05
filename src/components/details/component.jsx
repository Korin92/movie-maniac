import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MovieServices } from '../../services/movies-services'

import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'

import { STDetails, STPoster } from './style'
import CardCast from '../card-cast/component'
import Providers from '../watch-providers/component'

export default function Details() {
  //States
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(false)

  const [video, setVideo] = useState()
  const [language, setLanguage] = useState()

  const { movieId } = useParams()

  useEffect(() => {
    MovieServices.getDetails(movieId).then((movie) => {
      setMovie(movie)
      setLoading(true)
    })
  }, [movieId])

  useEffect(() => {
    MovieServices.getVideos(movieId).then((movie) => {
      setVideo(movie.results)

      setLoading(true)
    })
  }, [movieId])

  const releasedDate = () => {
    if (!movie.release_date) {
      return 'Sin fecha'
    }
    return new Date(movie.release_date).getFullYear()
  }
  const getVideo = (video) => {
    if (video) {
      const videoKey = video.filter((item) => item.type === 'Trailer')

      return videoKey[0].key
    }
  }

  return loading ? (
    <STDetails>
      <Card className="card-details">
        <STPoster image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}>
          <Typography className="title" variant="h5" component="div">
            {movie.title} ({releasedDate()})
          </Typography>
        </STPoster>
        <CardContent className="content">
          <Typography className="content-title">Sinopsis</Typography>
          <Typography>{movie.overview}</Typography>
          <Typography className="content-title">Reparto principal</Typography>
          <CardCast movieId={movieId} />
          <Typography className="content-title">Tráiler</Typography>
          <CardMedia
            className="trailer"
            component="iframe"
            alt="trailer of movie"
            src={video && `https://www.youtube.com/embed/${getVideo(video)}`}
            controls
            autoPlay
            allowFullScreen
          />
          <Typography className="content-title">¿Dónde encontrarla?</Typography>
          <Providers movieId={movieId} />
          <Typography className="content-title">Películas similares</Typography>

        </CardContent>
      </Card>
    </STDetails>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  )
}
