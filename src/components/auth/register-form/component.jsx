import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import { Typography } from '@mui/material'
import { authServices } from '../../../services/auth-services'

export default function RegisterForm(props) {
  const { open, handleClose } = props
  
  const [formData, setFormData] = useState(defaultValueForm())
  // const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // const handlerShowPassword = () => {
  //   setShowPassword(!showPassword)
  // }

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    authServices.register(setFormError, formData, setIsLoading, setAlert)
  }


  return (
    <div>
      <Stack sx={{ width: '100%' }} spacing={2}>
          {alert ?
            <Alert severity="success">
              Se ha enviado un email de verificación, por favor, comprueba tu correo
            </Alert>
            :
            <Alert severity="error">Error al enviar el email de verificacion</Alert>}
          </Stack> 
      <Dialog open={open}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Registro</DialogTitle>
          
          <DialogContent>
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
              <Typography className="error-text">Por favor, introduce un nombre de usuario.</Typography>
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
              <Typography className="error-text">Por favor, introduce un correo electronico válido.</Typography>
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
              <Typography className="error-text">
                Por favor, elige una contraseña superior a 5 caracteres.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Volver</Button>
            <Button type="submit" loading={isLoading} variant="contained">
              Registrarse
            </Button>
          </DialogActions>
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
