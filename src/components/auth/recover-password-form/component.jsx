/* eslint-disable no-use-before-define */
import React, { useState } from 'react'

// MaterialUI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Loader from '../../loader/component'
import AlertMessage from '../../alert/component'

import { AuthServices } from '../../../services/auth-services'

export default function RecoverPassword({ openRecoverPassword, handleCloseRecoverPassword }) {
  const [formData, setFormData] = useState(defaultValueForm())
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(false)

  // handlers
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    AuthServices.recoverPassword(
      formData.email,
      setAlert,
      setMessage,
      setSeverity,
      setIsLoading,
    )
  }

  return (
    <div>
      <Dialog open={openRecoverPassword}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Recuperar contraseña</DialogTitle>
          {alert ? <AlertMessage severity={severity} message={message} /> : null}
          <DialogContent>
            <DialogContentText>
              Introduce tu email para recibir un enlace para recuperar tu contraseña
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Correo electrónico"
              type="email"
              name="email"
              fullWidth
              variant="standard"
              error={formError.email}
            />
            {formError.email && (
            <span className="error-text">Por favor, introduce un correo electronico válido.</span>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              handleCloseRecoverPassword()
              setAlert(false)
              setFormError({})
            }}
            >
              Volver

            </Button>
            <Button type="submit" variant="contained">
              Recuperar contraseña
            </Button>
          </DialogActions>
        </form>
        {isLoading && <Loader open={openRecoverPassword} />}
      </Dialog>

    </div>
  )
}

function defaultValueForm() {
  return {
    email: '',
  }
}
