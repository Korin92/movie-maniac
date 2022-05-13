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
import { FavServices } from '../../services/fav-services'
import { MovieServices } from '../../services/movies-services'

// Components
import CardMediaComponent from '../card-media/component'

// Styles
import { STCardProfile } from '../../styles/card-profile/style'

export default function Favs({ user }) {
  const [favs, setFavs] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState()

  const getMoviesFavs = async () => {
    if (favs.length > 0) {
      const unresolvedPromises = favs.map((fav) =>
        MovieServices.getMovie(fav.credential))
      const results = await Promise.all(unresolvedPromises)
      setMovies(results)
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    FavServices.getFavs(user).then((i) => {
      setFavs(i)
    })
  }, [user])

  useEffect(() => {
    getMoviesFavs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favs])

  const handleClick = (id) => {
    const idRemove = favs.findIndex((fav) =>
      fav.credential === id)
    FavServices.removeFavs(favs[idRemove].id)

    setMovies((prevState) =>
      prevState.filter((movie) =>
        movie.id !== id))
  }

  return (
    <STCardProfile>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">Favoritos</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie) =>
              (
                <Grid key={movie.id} item>
                  <Card sx={{ maxWidth: 345 }} className="card">
                    <CardMediaComponent movie={movie} className="skeleton" loading={loading} />
                    {!loading ? (
                      <CardActions className="content-buttons">
                        <Tooltip title="Eliminar de favoritos">
                          <DeleteOutlineIcon onClick={() =>
                            handleClick(movie.id)}
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
    </STCardProfile>
  )
}
