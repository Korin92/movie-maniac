import { useEffect, useState } from 'react'
import {MovieServices} from '../../services/movies-services'
import { useParams } from "react-router-dom";
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
import CardMovies from '../card-movies/component';

export default function NowPlayingMovies() {

  console.log('now playing movies')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    MovieServices.getNowPlayingMovies().then((movies) => {
      setMovies(movies)
      setLoading(true)
    })
  }, [])

  return  <CardMovies movies={movies} loading={loading} />
}