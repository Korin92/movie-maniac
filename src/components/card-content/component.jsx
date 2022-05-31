import React from 'react'

import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { STCardContent } from './style'

export default function CardContentComponent(props) {
  const { movie } = props
  return (
    <STCardContent>
      <CardContent className="description">
        <Typography variant="h2" className="title">
          {movie.title}
        </Typography>
        <Typography className="text-description" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
    </STCardContent>
  )
}
