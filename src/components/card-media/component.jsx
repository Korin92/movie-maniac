import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'

import {STCardMedia} from './style'

export default function CardMediaComponent(props) {
  const { movie, loading, className } = props
  return (
    <STCardMedia>
      {loading ? (
        <CardMedia
          className="poster"
          component="img"
          alt="image of film"
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      ) : (
        <Skeleton className={className} variant="rectangular" />
      )}
    </STCardMedia>
  )
}
