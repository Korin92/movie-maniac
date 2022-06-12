import React, { useState, useEffect } from 'react'

// Material UI
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

// Services
import { MovieServices } from '../../services/movies-services'

// Image default
import NOIMAGE from '../../assets/png/NO-IMAGE1.png'

// Styles
import { STCardCast } from './style'

export default function CardCast(props) {
  // States
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState({})

  // Props
  const { movieId } = props

  // Useffect for get credits
  useEffect(() => {
    MovieServices.getCredits(movieId).then((movie) => {
      setCredits(movie)
      setLoading(true)
    })
  }, [movieId])

  // Function for get image
  const getImage = (image) => {
    if (image) {
      return `https://image.tmdb.org/t/p/original/${image}`
    }
    return NOIMAGE
  }

  return loading ? (
    <STCardCast>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Grid className="grid-card" justifyContent="center" container spacing={2}>
            {credits.cast
              .filter((cast, index) =>
                index < 5)
              .map((item) =>
                (
                  <Grid key={item.id} item>
                    <Card className="card">
                      {item ? (
                        <CardMedia
                          className="img-actor"
                          component="img"
                          alt={`imagen of the actor ${item.name}`}
                          image={getImage(item.profile_path)}
                        />
                      ) : (
                        <Skeleton variant="rectangular" width={210} height={118} />
                      )}

                      {item ? (
                        <CardContent className="description">
                          <Typography
                            className="description-name"
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            className="text-description"
                            variant="body2"
                            color="text.secondary"
                          >
                            {item.character}
                          </Typography>
                        </CardContent>
                      ) : (
                        <Box sx={{ pt: 0.5 }}>
                          <Skeleton />
                          <Skeleton width="60%" />
                        </Box>
                      )}
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </STCardCast>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  )
}
