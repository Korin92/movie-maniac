import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'

import { Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import { STAdmin, STContainer } from './style'
import { AdminServices } from '../../services/admin-services'
import TableUsers from '../table-users/component'
import { RatingServices } from '../../services/rating-services'

export default function Admin() {
  const [reset, setReset] = useState(false)
  const [users, setUsers] = useState([])
  const [tableUsers, setTableUsers] = useState(false)
  const [totalRatings, setTotalRatings] = useState([])
  const [close, setClose] = useState(true)

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
  useEffect(() => {
    AdminServices.getUsers().then((i) => {
      setUsers(i)
    })
  }, [])

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
          {' '}
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
          {' '}
          {users?.length}
        </Typography>
        <Button className="admin-btn" onClick={handlerTableUsers}>Consultar usuarios</Button>
      </STAdmin>
      <div className="table">
        {tableUsers && (
        <>
          <TableUsers users={users} />
          <Button
            className="btn"
            onClick={() =>
              setTableUsers(false)}
          >
            {' '}
            Cerrar tabla
          </Button>

        </>

        )}
      </div>

    </STContainer>
  )
}
