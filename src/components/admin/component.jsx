import React, { useEffect, useState } from 'react'

// Material UI
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import Alert from '@mui/material/Alert'

// Services
import { AdminServices } from '../../services/admin-services'
import { RatingServices } from '../../services/rating-services'

// Components
import TableUsers from '../table-users/component'

// Styles
import { STAdmin, STContainer } from './style'

export default function Admin() {
  // States
  const [reset, setReset] = useState(false)
  const [users, setUsers] = useState([])
  const [tableUsers, setTableUsers] = useState(false)
  const [totalRatings, setTotalRatings] = useState([])
  const [close, setClose] = useState(true)

  // Functions
  const handleReset = () => {
    AdminServices.deleteRatings().then(() => {
      if (totalRatings?.length > 0) {
        setReset(true)
        setClose(false)
        setTotalRatings(0)
      } else {
        setReset(false)
        setClose(false)
      }
    }).catch((err) => {
      console.log(err)
      setReset(false)
    })
  }

  const handlerTableUsers = () => {
    setTableUsers(true)
  }

  // Effects

  /** Effect for get users */
  useEffect(() => {
    AdminServices.getUsers().then((i) => {
      setUsers(i)
    })
  }, [])

  /** Effect for get ratings */
  useEffect(() => {
    RatingServices.getRatings().then((i) => {
      setTotalRatings(i)
    })
  }, [reset])

  return (
    <STContainer>
      <STAdmin>
        <Typography className="title" variant="h1">Administración de la página</Typography>
        <Typography className="title-rating" variant="h2">
          Total de películas valoradas:
          <span />
          {totalRatings?.length ? totalRatings.length : 0}
        </Typography>
        <Button className="admin-btn" onClick={handleReset}>Resetear valoraciones de películas</Button>
        {!close && (
          reset ? (
            <Alert sx={{ margin: '8px' }} onClose={() => { setClose(true) }}>Valoraciones reseteadas</Alert>)
            : (<Alert sx={{ margin: '8px' }} severity="warning" onClose={() => { setClose(true) }}>No hay valoraciones</Alert>)
        )}
        <Typography className="title-rating" variant="h2">
          Total de usuarios registrados:
          <span />
          {users?.length}
        </Typography>
        <Button className="admin-btn" onClick={handlerTableUsers}>Consultar usuarios</Button>
      </STAdmin>
      <div className="table">
        {tableUsers ? (
          <>
            <TableUsers users={users} />
            <Button
              className="btn"
              onClick={() =>
                setTableUsers(false)}
            >
              <span />
              Cerrar tabla
            </Button>

          </>

        ) : null}
      </div>

    </STContainer>
  )
}
