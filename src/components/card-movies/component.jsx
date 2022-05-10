import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Avatar from '@mui/material/Avatar'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { STCardMovies } from './style'
import { DatabaseServices } from '../../services/database-services'
import CardMediaComponent from '../card-media/component'
import CardContentComponent from '../card-content/component'

export default function CardMovies({ movies, loading, title, className }) {
  const handleClick = (movie) => {
    DatabaseServices.addFavs(movie.id)
    console.log('id', movie.id)
  }

  return (
    <STCardMovies className={className}>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">{title}</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie) => (
              <Grid key={movie.id} item>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMediaComponent movie={movie} loading={loading} className='skeleton' />

                  {!loading ? (
                    <>
                      <CardContentComponent movie={movie} />
                      <CardActions className="content-buttons">
                        <Button
                          className="icon-favourite"
                          size="small"
                          onClick={() => {
                            handleClick(movie)
                          }}
                        >
                          <FavoriteIcon />
                        </Button>
                        <Button className="icon-pending" size="small">
                          <VisibilityOffIcon />
                        </Button>
                        <Button className="icon-seen" size="small">
                          <RemoveRedEyeIcon />
                        </Button>

                        <MenuItem as={Link} to={`/details/${movie.id}`}>
                          <Button size="small">Saber más</Button>
                        </MenuItem>
                      </CardActions>
                    </>
                  ) : (
                    <Box className="skeleton-animation" sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton width="80%" />
                      <Skeleton width="60%" />
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
    </STCardMovies>
  )
}
