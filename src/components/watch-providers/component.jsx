import React, { useEffect, useState } from 'react'
import { MovieServices } from '../../services/movies-services'

import Paper from '@mui/material/Paper'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { STProviders } from './style'

export default function Providers(props) {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)

  const { movieId } = props

  useEffect(() => {
    MovieServices.getProviders(movieId).then((movie) => {
      setProviders(movie.results.ES)
      setLoading(true)
    })
  }, [movieId])

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
      {getProviders()?.map((item) => (
        <Container key={item.provider_id} className="container-item">
          <Paper className="item" elevation={3}>
            <CardMedia
              className="img-providers"
              component="img"
              alt="image of actor"
              image={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
            />
          </Paper>
          <Typography className="item-name">{item.provider_name}</Typography>
        </Container>
      ))}
    </STProviders>
  ) : (
    <div>Loading...</div>
  )
}
