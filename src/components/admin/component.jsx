import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'

import { Typography } from '@mui/material'
import { STAdmin, STContainer } from './style'
import { AdminServices } from '../../services/admin-services'
import TableUsers from '../table-users/component'
import { RatingServices } from '../../services/rating-services'

export default function Admin() {
  const [reset, setReset] = useState(false)
  const [users, setUsers] = useState([])
  const [tableUsers, setTableUsers] = useState(false)
  const [totalRatings, setTotalRatings] = useState([])

  const handleReset = () => {
    AdminServices.deleteRatings().then(() => {
      setReset(true)
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
  }, [])

  console.log('tableRatings', totalRatings)
  console.log('users', users)
  return (
    <STContainer>
      <STAdmin>
        <Typography className="title" variant="h1">Administración de la página</Typography>
        <Typography className="title-rating" variant="h2">
          Total de películas valoradas:
          {' '}
          {totalRatings.length}
        </Typography>
        <Button className="admin-btn" onClick={handleReset}>Resetear valoraciones de películas</Button>
        {reset && <p>Valoraciones reseteadas</p>}
        <Typography className="title-rating" variant="h2">
          Total de usuarios registrados:
          {' '}
          {users.length}
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
