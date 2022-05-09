import React from 'react'

import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { STCardContent } from './style'

export default function CardContentComponent(props) {
  const { movie } = props
  return (
    <STCardContent>
      <CardContent className="description">
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography className="text-description" variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
    </STCardContent>
  )
}
