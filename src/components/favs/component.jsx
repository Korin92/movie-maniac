import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//Firebase
import { db, auth } from '../../utils/firebase'
import { getDocs, query, collection } from 'firebase/firestore'

//Services
import { MovieServices } from '../../services/movies-services'
import { DatabaseServices } from '../../services/database-services'

//MaterialUI
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

//Components
import CardMediaComponent from '../card-media/component'

//Styles
import { STCardFav } from './style'

export default function Favs() {
  const [favs, setFavs] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFavs()
  }, [])

  useEffect(() => {
    favs?.map((fav) =>
      MovieServices.getMovie(fav.credential).then((movie) => {
        setMovies((prevState) => [...prevState, movie])
      })
    )
    setLoading(false)
  }, [favs])

  const getFavs = async () => {
    const q = query(collection(db, `users/${auth.currentUser.uid}/favs`))
    const querySnapshot = await getDocs(q)
    const arrayFavs = []

    querySnapshot?.docs.map((movie) => {
      const data = movie.data()
      data.id = movie.id
      return arrayFavs.push(data)
    })
    setFavs(arrayFavs)
  }

  const handleClick = (id) => {
    let idRemove = favs.findIndex((fav) => fav.credential === id)
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
                    <>
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
                    </>
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
