/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from 'react'

// Material UI
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'

// Styles
import { STCardMedia } from './style'

// Default image
import NOIMAGEFILM from '../../assets/png/no-image-film.png'

export default function CardMediaComponent(props) {
  // Props
  const { movie, loading, className } = props
  const { backdrop_path, poster_path } = movie

  // Constants
  const image = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : backdrop_path ? `https://image.tmdb.org/t/p/w780${backdrop_path}` : NOIMAGEFILM

  return (
    <STCardMedia>
      {!loading ? (
        <CardMedia
          className="poster"
          component="img"
          alt={`poster of the movie ${movie.title}`}
          image={image}
        />
      ) : (
        <Skeleton className={className} variant="rectangular" />
      )}
    </STCardMedia>
  )
}
