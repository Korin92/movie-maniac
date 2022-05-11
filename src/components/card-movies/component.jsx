/* eslint-disable semi */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// MaterialUI
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Avatar from '@mui/material/Avatar'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Styles
import { STCardMovies } from './style'

// Services
import { DatabaseServices } from '../../services/database-services'

// Components
import CardMediaComponent from '../card-media/component'
import CardContentComponent from '../card-content/component'

// eslint-disable-next-line react/prop-types
export default function CardMovies({
  movies, loading, title, className, user,
}) {
  const [style, setStyle] = useState(false)

  const handleClick = (movie) => {
    DatabaseServices.addFavs(movie.id)

    setStyle(!style)
  }

  const handleButtonFavorite = (movie) => {
    if (DatabaseServices.findFavs(movie)) {
      return true
    }
    return false
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0c0735',
      },
      fav: {
        main: '#ff0000',
      },
    },
  })

  return (
    <STCardMovies className={className}>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <h2 className="title">{title}</h2>
          <Grid justifyContent="center" container spacing={2} className="grid">
            {movies?.map((movie) => (
              <Grid key={movie.id} item>
                <Card sx={{ maxWidth: 345 }} className="card">
                  <CardMediaComponent movie={movie} loading={loading} className="skeleton" />

                  {!loading ? (
                    <>
                      <CardContentComponent movie={movie} />
                      <CardActions className="content-buttons">
                        {user && (
                          <>
                            <ThemeProvider theme={theme}>
                              {handleButtonFavorite(movie.id) ? (
                                <Tooltip title="Añadir a favoritos">
                                  <FavoriteIcon
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                      handleClick(movie)
                                    }}
                                  />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Quitar de favoritos">
                                  <FavoriteIcon
                                    color="fav"
                                    size="small"
                                    onClick={() => {
                                      handleClick(movie)
                                    }}
                                  />
                                </Tooltip>
                              )}
                            </ThemeProvider>

                            <Tooltip title="Añadir a pendientes">
                              <VisibilityOffIcon />
                            </Tooltip>

                            <Tooltip title="Añadir a vistas">
                              <RemoveRedEyeIcon />
                            </Tooltip>
                          </>
                        )}

                        <MenuItem as={Link} to={`/details/${movie.id}`}>
                          <Typography className="more">Saber más</Typography>
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
