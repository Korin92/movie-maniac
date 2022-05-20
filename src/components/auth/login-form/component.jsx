/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'

// MaterialUI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// components
import ButtonResetSendEmailVerification from '../../reset-send-email-validation/component'
import Loader from '../../loader/component'
import AlertMessage from '../../alert/component'

// services
import { AuthServices } from '../../../services/auth-services'
import RecoverPassword from '../recover-password-form/component'

export default function LoginForm(props) {
  // States
  // eslint-disable-next-line no-use-before-define
  const [formData, setFormData] = useState(defaultValueForm())
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userActive, setUserActive] = useState(true)
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [message, setMessage] = useState(null)
  const [openRecoverPassword, setOpenRecoverPassword] = useState(false)

  // props
  const { open, handleClose } = props

  // handlers
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const login = () => {
    AuthServices.login(
      setFormError,
      formData,
      setIsLoading,
      handleClose,
      setUser,
      setUserActive,
      setMessage,
      setAlert,
      setSeverity,
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    login()
  }

  const handleOpenRecoverPassword = () => {
    setOpenRecoverPassword(true)
  }

  const handleCloseRecoverPassword = () => {
    setOpenRecoverPassword(false)
  }

  useEffect(() =>
    () => {
      setFormData({}) // This worked for me
    }, [])

  return (
    <div>
      <Dialog open={open}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Inicio de sesión</DialogTitle>
          {alert ? <AlertMessage severity={severity} message={message} /> : null}
          <DialogContent>
            <DialogContentText>
              Si estás registrado en nuestra web, introduce tu email y contraseña para acceder a tu
              zona de usuario
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
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Contraseña"
              type="password"
              name="password"
              fullWidth
              variant="standard"
              error={formError.password}
            />
            {formError.password && (
              <span className="error-text">
                Por favor, elige una contraseña superior a 5 caracteres.
              </span>
            )}
            <DialogContentText>
              ¿No recuerdas tu contraseña?
              {' '}
              <Button onClick={() => {
                handleOpenRecoverPassword()
                handleClose()
              }}
              >
                Haz click aquí
              </Button>
            </DialogContentText>

          </DialogContent>

          <DialogActions>
            <Button onClick={() => {
              handleCloseRecoverPassword()
              handleClose()
              setAlert(false)
              setFormError({})
            }}
            >
              Volver
            </Button>
            <Button type="submit" variant="contained">
              Iniciar Sesión
            </Button>
          </DialogActions>
        </form>
        {isLoading && <Loader open={open} />}
        {!userActive && (
          <ButtonResetSendEmailVerification
            user={user}
            setIsLoading={setIsLoading}
            setUserActive={setUserActive}
            setMessage={setMessage}
            setAlert={setAlert}
            setSeverity={setSeverity}
          />
        )}
      </Dialog>
      {openRecoverPassword && (
      <RecoverPassword openRecoverPassword={openRecoverPassword} handleCloseRecoverPassword={handleCloseRecoverPassword} />
      )}
    </div>
  )
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
  }
}
