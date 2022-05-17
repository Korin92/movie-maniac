/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { signOut, updatePassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'

import { AuthServices } from '../../services/auth-services'

import AlertMessage from '../alert/component'

export default function ChangePasswordForm({ open, handleClose }) {
  const [formData, setFormData] = useState(defaultValueForm())
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // handlers
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (
      !formData.currentPassword
      || !formData.newPassword
      || !formData.repeatNewPassword
    ) {
      setMessage('Los campos no pueden estar vacíos')
      setSeverity('warning')
      setAlert(true)
    } else if (formData.currentPassword === formData.newPassword) {
      setMessage('La nueva contraseña no puede ser igual a la actual')
      setSeverity('warning')
      setAlert(true)
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      setMessage('La nueva contraseña no coincide')
      setSeverity('warning')
      setAlert(true)
    } else if (formData.newPassword.length < 6) {
      setMessage(
        'La contraseña tiene que tener una longitud mínima de 6 caracteres',
      )
      setSeverity('warning')
      setAlert(true)
    } else {
      setAlert(false)
      setIsLoading(true)
      AuthServices.reauthenticate(formData.currentPassword)
        .then(() => {
          const { currentUser } = auth

          updatePassword(currentUser, formData.newPassword)
            .then(() => {
              setMessage('Contraseña actualizada')
              setIsLoading(false)
              signOut(auth)
            })
            .catch((err) => {
              console.log(err)
              setIsLoading(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }

  return (
    <div>
      <Dialog open={open}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Inicio de sesión</DialogTitle>
          {alert ? <AlertMessage severity={severity} message={message} /> : null}
          <DialogContent>
            <DialogContentText>
              Introduce la contraseña actual y la nueva contraseña
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="currentPassword"
              label="Contraseña actual"
              type="password"
              name="currentPassword"
              fullWidth
              variant="standard"
            //   error={formError.email}
            />
            {/* {formError.email && (
              <span className="error-text">Por favor, introduce un correo electronico válido.</span>
            )} */}
            <TextField
              autoFocus
              margin="dense"
              id="newPassword"
              label="Nueva contraseña"
              type="password"
              name="newPassword"
              fullWidth
              variant="standard"
            //   error={formError.password}
            />
            {/* {formError.password && (
              <span className="error-text">
                Por favor, elige una contraseña superior a 5 caracteres.
              </span>
            )} */}
            <TextField
              autoFocus
              margin="dense"
              id="repeatNewPassword"
              label="Repite la nueva contraseña"
              type="password"
              name="repeatNewPassword"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Volver</Button>
            <Button type="submit" variant="contained">
              Cambiar contraseña
            </Button>
          </DialogActions>
        </form>
        {/* {isLoading && <Loader open={open} />} */}
      </Dialog>
    </div>
  )
}

function defaultValueForm() {
  return {
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  }
}
