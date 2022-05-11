import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// MaterialUI
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

// Styles
import { STCardProfile } from '../../styles/card-profile/style'

// Services
import { MovieServices } from '../../services/movies-services'
import { PendingWatchServices } from '../../services/pending-watch-services'
import { MoviesSeenServices } from '../../services/movies-seen-services'

// Components
import CardMediaComponent from '../card-media/component'

export default function PendingWatch() {
  const [pending, setPending] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState()

  const getMoviesPending = async () => {
    if (pending.length > 0) {
      const unresolvedPromises = pending.map((pendingWatch) =>
        MovieServices.getMovie(pendingWatch.credential)
      )
      const results = await Promise.all(unresolvedPromises)
      setMovies(results)
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    PendingWatchServices.getPending().then((i) => {
      setPending(i)
    })
  }, [])

  useEffect(() => {
    getMoviesPending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  const handleClick = (id) => {
    MoviesSeenServices.addMoviesSeen(id)
    const idRemove = pending.findIndex((pendingWatch) => pendingWatch.credential === id)
    PendingWatchServices.removePending(pending[idRemove].id)

    setMovies((prevState) => prevState.filter((movie) => movie.id !== id))
  }

  return (
    <STCardProfile>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">Pendientes de ver</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie) => (
              <Grid key={movie.id} item>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMediaComponent movie={movie} className="skeleton" loading={loading} />
                  {!loading ? (
                    <CardActions className="content-buttons">
                      <Tooltip title="Añadir a vistas">
                        <RemoveRedEyeIcon onClick={() => handleClick(movie.id)} />
                      </Tooltip>

                      <MenuItem as={Link} to={`/details/${movie.id}`}>
                        <Typography className="more">Saber más</Typography>
                      </MenuItem>
                    </CardActions>
                  ) : (
                    <Box className="skeleton2" sx={{ pt: 0.5 }}>
                      <Skeleton variant="circular">
                        <Avatar />
                      </Skeleton>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </STCardProfile>
  )
}
