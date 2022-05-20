import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'

import { STAdmin } from './style'
import { AdminServices } from '../../services/admin-services'
import TableUsers from '../table-users/component'

export default function Admin() {
  const [reset, setReset] = useState(false)
  const [users, setUsers] = useState([])
  const [tableUsers, setTableUsers] = useState(false)

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

  return (
    <STAdmin>
      Administración de página
      <Button onClick={handleReset}>Resetear valoraciones de películas</Button>
      {reset && <p>Valoraciones reseteadas</p>}

      <Button onClick={handlerTableUsers}>Consultar usuarios</Button>
      {tableUsers && (
        <>
          <TableUsers users={users} />
          <Button onClick={() =>
            setTableUsers(false)}
          >
            {' '}
            Cerrar tabla
          </Button>
        </>
      )}
    </STAdmin>
  )
}
