import { useEffect, useState } from 'react'
import getMovies from '../../services/getMovies'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

import { STCardMovies } from './style'

export default function ListOfMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMovies().then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [])

  return loading ? (
    <STCardMovies>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
        <h2 className='title'>Las más populares...</h2>
          <Grid justifyContent="center" container spacing={2}>
            {movies.results.map((movie, index) => (
              <Grid key={index} item>
                <Card sx={{ maxWidth: 345 }}>
                  {movie ? (
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width={210} height={118} />
                  )}

                  {movie ? (
                    <>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {movie.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {movie.overview}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
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
          </Grid>
        </Grid>
      </Grid>
    </STCardMovies>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  )
}
