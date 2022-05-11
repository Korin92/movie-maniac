/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable semi */
import React, { useState, useEffect } from 'react'
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

// Services
import { DatabaseServices } from '../../services/database-services'
import { MovieServices } from '../../services/movies-services'

// Components
import CardMediaComponent from '../card-media/component'

// Styles
import { STCardFav } from './style'

export default function Favs() {
  const [favs, setFavs] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    DatabaseServices.getFavs(setFavs)
  }, [])

  useEffect(() => {
    setMovies([])
    favs?.map((fav) =>
      MovieServices.getMovie(fav.credential).then((movie) => {
        setMovies((prev) => [...prev, movie])
      }))
    setLoading(false)
  }, [favs])

  const handleClick = (id) => {
    const idRemove = favs.findIndex((fav) => fav.credential === id)
    DatabaseServices.removeFavs(favs[idRemove].id)
    setMovies((prevState) => prevState.filter((movie) => movie.id !== id))
  }

  return (
    <STCardFav>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">Favoritos</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie) => (
              <Grid key={movie.id} item>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMediaComponent movie={movie} className="skeleton" loading={loading} />
                  {!loading ? (
                    <CardActions className="content-buttons">
                      <Tooltip title="Quitar de favoritos">
                        <DeleteOutlineIcon
                          onClick={() => {
                            handleClick(movie.id)
                          }}
                        />
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
    </STCardFav>
  )
}
