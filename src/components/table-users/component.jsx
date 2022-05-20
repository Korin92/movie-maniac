/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { AdminServices } from '../../services/admin-services'
import { HandlerButtonsAdmin } from '../../utils/handler-buttons-admin/addAdmin'

export default function TableUsers({ users }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [admin, setAdmin] = useState([])
  const [adminCredential, setAdminCredential] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AdminServices.getAdmins().then((i) => {
      setAdmin(i)
      setIsAdmin(false)
    })
  }, [isAdmin])

  const adminID = async (admin) => {
    const arrayIdAdmins = []

    if (admin.length > 0) {
      admin.map((idAdmin) =>
        arrayIdAdmins.push(idAdmin.id))
    }

    return arrayIdAdmins
  }

  useEffect(() => {
    adminID(admin).then((i) => {
      setAdminCredential(i)
      setIsAdmin(true)
    })
  }, [admin])

  return (
    <TableContainer sx={{ width: 'auto' }} component={Paper}>
      <Table sx={{ minWidth: 400, width: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre de usuario</TableCell>
            <TableCell align="right">Administrador</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) =>
            (
              <TableRow
                key={user.uid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.displayName}
                </TableCell>
                <TableCell align="center">{isAdmin && adminCredential.includes(user.uid) ? 'Sí' : 'No'}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="right">
                  <Button
                    disabled={!!adminCredential.includes(user.id)}
                    onClick={() =>
                      HandlerButtonsAdmin.handleAdmin(user)}
                  >
                    Hacer administrador
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
