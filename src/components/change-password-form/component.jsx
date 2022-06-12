/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState, useContext } from 'react'

// React router
import { useNavigate } from 'react-router-dom'

// Material UI
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// Firebase
import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase'

// States
import { AuthServices } from '../../services/auth-services'

// Utils
import { MyGlobalStateContext } from '../../utils/globalState'

// Components
import AlertMessage from '../alert/component'

export default function ChangePasswordForm({
  openChangePassword,
  handleCloseChangePassword,
}) {
  // States
  const [formData, setFormData] = useState(defaultValueForm())
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState(false)
  const [severity, setSeverity] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Context
  const { setShow } = useContext(MyGlobalStateContext)

  // Navigate
  const navigate = useNavigate()

  // handlers
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // handlers
  const onSubmit = (e) => {
    e.preventDefault()
    AuthServices.changePassword(
      formData,
      setIsLoading,
      setAlert,
      setSeverity,
      setMessage,
    )
  }

  // UseEffect to navigate to home and sing out user
  useEffect(() => {
    if (severity === 'success') {
      navigate('/')
      setShow(true)
      signOut(auth)
    }
  }, [navigate, setShow, severity])

  return (
    <div>
      <Dialog open={openChangePassword}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Cambio de contraseña</DialogTitle>
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
            />
            <TextField
              autoFocus
              margin="dense"
              id="newPassword"
              label="Nueva contraseña"
              type="password"
              name="newPassword"
              fullWidth
              variant="standard"
            />
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
            <Button onClick={handleCloseChangePassword}>Volver</Button>
            <Button type="submit" variant="contained">
              Cambiar contraseña
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

// Function to set default values
function defaultValueForm() {
  return {
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  }
}
