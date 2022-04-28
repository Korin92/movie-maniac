import { useState } from 'react'

//MaterialUI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

//components
import ButtonResetSendEmailVerification from '../../reset-send-email-validation/component'

//services
import { authServices } from '../../../services/auth-services'

export default function LoginForm(props) {
  //States
  const [formData, setFormData] = useState(defaultValueForm())
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userActive, setUserActive] = useState(true)
  const [user, setUser] = useState(null)

  //props
  const { open, handleClose } = props

  //handlers
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    authServices.login(setFormError, formData, setIsLoading, handleClose, setUser, setUserActive)
  }

  return (
    <div>
      <Dialog open={open}>
        <form onSubmit={onSubmit} onChange={onChange}>
          <DialogTitle>Inicio de sesión</DialogTitle>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Volver</Button>
            <Button type="submit" loading={isLoading} variant="contained">
              Iniciar Sesión
            </Button>
          </DialogActions>
        </form>
        {!userActive && (
          <ButtonResetSendEmailVerification
            user={user}
            setIsLoading={setIsLoading}
            setUserActive={setUserActive}
          />
        )}
      </Dialog>
    </div>
  )
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
  }
}
