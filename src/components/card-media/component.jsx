/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import Skeleton from '@mui/material/Skeleton'

import { STCardMedia } from './style'

import NOIMAGEFILM from '../../assets/png/no-image-film.png'

export default function CardMediaComponent(props) {
  const { movie, loading, className } = props

  const { backdrop_path, poster_path } = movie

  const image = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : NOIMAGEFILM

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
