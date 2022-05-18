import React, { useState } from 'react'

// MaterialUI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

// Components
import AlertMessage from '../../alert/component'
import Loader from '../../loader/component'

// Services
import { AuthServices } from '../../../services/auth-services'

export default function RegisterForm(props) {
  const { open, handleClose } = props

  // eslint-disable-next-line no-use-before-define
  const [formData, setFormData] = useState(defaultValueForm())
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [severity, setSeverity] = useState(null)
  const [message, setMessage] = useState(null)

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    AuthServices.register(setFormError, formData, setIsLoading, setAlert, setSeverity, setMessage)
  }

  return (
    <div>
      <Dialog open={open}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Registro</DialogTitle>
          <DialogContent>
            {alert ? <AlertMessage severity={severity} message={message} /> : null}
            <DialogContentText>
              ¿Aún no tienes cuenta? Regístrate con tu correo electrónico.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Nombre de usuario"
              type="text"
              name="username"
              fullWidth
              variant="standard"
              error={formError.username}
            />
            {formError.username && (
              <span className="error-text">
                Por favor, introduce un nombre de usuario.
              </span>
            )}
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Correo electrónico"
              type="text"
              name="email"
              fullWidth
              variant="standard"
              error={formError.email}
            />
            {formError.email && (
              <span className="error-text">
                Por favor, introduce un correo electronico válido.
              </span>
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose()
                setAlert(false)
                setFormError({})
              }}
            >
              Volver
            </Button>
            <Button type="submit" variant="contained">
              Registrarse
            </Button>
          </DialogActions>
          {isLoading && <Loader open={open} />}
        </form>
      </Dialog>
    </div>
  )
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
    username: '',
  }
}
