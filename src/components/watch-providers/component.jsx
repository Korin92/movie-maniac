/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react'

// Material UI
import Paper from '@mui/material/Paper'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

// Services
import { MovieServices } from '../../services/movies-services'

// Styles
import { STProviders } from './style'

export default function Providers(props) {
  // States
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)

  // Props
  const { movieId } = props

  // UseEffect for get providers
  useEffect(() => {
    MovieServices.getProviders(movieId).then((movie) => {
      setProviders(movie.results.ES)
      setLoading(true)
    })
  }, [movieId])

  // Function for render providers
  const getProviders = () => {
    if (!providers) return
    let provider = ''
    if (providers.buy) {
      provider = providers.buy
    } else if (providers.flatrate) {
      provider = providers.flatrate
    } else {
      provider = providers.rent
    }

    return provider
  }

  return loading ? (
    <STProviders>
      {!providers && (
        <Typography className="item-name">
          Actualmente no se encuentra disponible en ninguna plataforma
        </Typography>
      )}
      {getProviders()?.map((item) =>
        (
          <Container key={item.provider_id} className="container-item">
            <Paper className="item" elevation={3}>
              <CardMedia
                className="img-providers"
                component="img"
                alt={`logo of ${item.provider_name}`}
                image={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
              />
            </Paper>
            <Typography variant="h2" className="item-name">{item.provider_name}</Typography>
          </Container>
        ))}
    </STProviders>
  ) : (
    <div>Loading...</div>
  )
}
