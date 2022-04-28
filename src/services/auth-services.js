import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

//Utils
import { validateEmail } from '../utils/validations'
import { Errors } from '../utils/errors'

//Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from 'firebase/auth'
import { auth } from '../utils/firebase'

const login = (setFormError, formData, setIsLoading, handleClose, setUser, setUserActive) => {
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
        Errors.handlerErrors(err.code)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
}

const register = (setFormError, formData, setIsLoading, setAlert) =>{
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
    if (!formData.username) {
      errors.username = true
      formOk = false
    }
    setFormError(errors)

    if (formOk) {
      console.log('entro al formOk')
      setIsLoading(true)
      const user = createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          changeUserName()
          sendEmailVerification(auth.currentUser)
          console.log(user)
        })
        .then(() => {
            setAlert(true)
          // <Stack sx={{ width: '100%' }} spacing={2}>
          //   <Alert severity="success">
          //     Se ha enviado un email de verificación, por favor, comprueba tu correo
          //   </Alert>
          // </Stack>
           console.log('se ha enviado email de verificacion')
        })
        .catch((error) => {
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Error al enviar el email de verificacion</Alert>
          </Stack>
          console.log('Error al mandar email de verificacion', error)
        })
        .catch((error) => {
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Error al crear la cuenta</Alert>
          </Stack>
          console.log('Error al crear la cuenta', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    const changeUserName = () => {
        updateProfile(auth.currentUser, {
          displayName: formData.username,
        }).catch(() => {
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Error al asignar el nombre de usuario</Alert>
          </Stack>
        })
      }
}

export const authServices = {
  login,
  register
}
