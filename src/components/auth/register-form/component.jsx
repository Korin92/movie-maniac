import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function RegisterForm(props) {
  const { open, handleClose } = props

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Registro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¡Bienvenido! Si aún no estás registrado en nuestra web, puedes hacerlo ahora mismo.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de usuario"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Volver</Button>
          <Button>Registrarse</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
