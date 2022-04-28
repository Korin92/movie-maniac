import { useState } from 'react'

//MaterialUI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

//Utils
import { validateEmail } from '../../../utils/validations'

//Firebase
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '../../../utils/firebase'

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

    setFormError({})
    let errors = {}
    let formOk = true

    if (!validateEmail(formData.email)) {
      errors.email = true
      formOk = false
    }

    if (formData.password.length < 6) {
      errors.password = true
      formOk = false
    }
    setFormError(errors)

    if (formOk) {
      setIsLoading(true)
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((response) => {
          setUser(response.user)
          setUserActive(response.user.emailVerified)
          handleClose()
          if (!response.user.emailVerified) {
            ;<Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">Verifica tu cuenta para acceder</Alert>
            </Stack>
          }
        })
        .catch((err) => {
          handlerErrors(err.code)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
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

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props
  const resendVerificationEmail = () => {
    sendEmailVerification(user)
      .then(() => {
        ;<Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Se ha enviado email de confirmación</Alert>
        </Stack>
      })
      .catch((err) => {
        handlerErrors(err.code)
      })
      .finally(() => {
        setIsLoading(false)
        setUserActive(true)
      })
  }
  return (
    <div className="resend-verification-email">
      <p>
        Si no has recibido el email de verificación puedes volver a enviarlo haciendo click{' '}
        <span onClick={resendVerificationEmail}>aquí</span>
      </p>
    </div>
  )
}

function handlerErrors(code) {
  switch (code) {
    case 'auth/wrong-password':
      ;<Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">El usuario o la contraseña son incorrectos</Alert>
      </Stack>

      break
    case 'auth/too-many-requests':
      ;<Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">
          Has enviado demasiadas solicitudes de reenvío de email de confirmación en muy poco tiempo
        </Alert>
      </Stack>
      break
    case 'auth/user-not-found':
      ;<Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">El usuario o la contraseña son incorrectos</Alert>
      </Stack>

      break

    default:
      break
  }
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
  }
}
