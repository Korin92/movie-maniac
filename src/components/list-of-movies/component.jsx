import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MovieServices } from '../../services/movies-services'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

import { STCardMovies } from './style'

export default function ListOfMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    MovieServices.getTrendingsMovies().then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [])

  return loading ? (
    <STCardMovies>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">Las más populares...</h2>
          <Grid justifyContent="center" container spacing={2}>
            {movies.results.map((movie) => (
              <Grid key={movie.id} item>
                <Card sx={{ maxWidth: 345 }}>
                  {movie ? (
                    <CardMedia
                      className="poster"
                      component="img"
                      alt="image of film"
                      image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width={210} height={118} />
                  )}

                  {movie ? (
                    <>
                      <CardContent className="description">
                        <Typography gutterBottom variant="h5" component="div">
                          {movie.title}
                        </Typography>
                        <Typography
                          className="text-description"
                          variant="body2"
                          color="text.secondary"
                        >
                          {movie.overview}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>

                        <MenuItem as={Link} to={`/details/${movie.id}`}>
                          <Button size="small">Saber más</Button>
                        </MenuItem>
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
