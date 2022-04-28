//Utils
import { validateEmail } from '../utils/validations'
import { Errors } from '../utils/errors'

//Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import { auth } from '../utils/firebase'

const login = (
  setFormError,
  formData,
  setIsLoading,
  handleClose,
  setUser,
  setUserActive,
  setMessage,
  setAlert,
  setSeverity
) => {
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

        if (!response.user.emailVerified) {
          setSeverity('warning')
          setAlert(true)
          setMessage('Verifica tu email para acceder')
        } else {
          handleClose()
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

const register = (setFormError, formData, setIsLoading, setAlert, setSeverity, setMessage) => {
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
        setSeverity('success')
        setMessage(
          'Se ha enviado un email de verificación. Por favor, comprueba tu bandeja de entrada'
        )
      })
      .catch((error) => {
        setSeverity('error')
        setMessage('Ha ocurrido un error, por favor, inténtalo de nuevo')
      })
      .catch((error) => {
        setSeverity('error')
        setMessage('Ha ocurrido un error, por favor, inténtalo de nuevo')
      })
      .finally(() => {
        setAlert(true)
        setIsLoading(false)
      })
  }

  const changeUserName = (setMessage) => {
    updateProfile(auth.currentUser, {
      displayName: formData.username,
    }).catch(() => {
      setSeverity('error')
      setMessage('Error al asignar el nombre de usuario')
    })
  }
}

export const authServices = {
  login,
  register,
}
